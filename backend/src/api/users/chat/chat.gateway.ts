import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { UserDto } from '../user/model/dto/user.dto';
import { ChatMessage, ChatMode } from './model/chat.definitions';
import { ChatService } from './service/chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wsServer: Server;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    if (!await this.authorize(socket)) return;
    socket.emit(ChatMode.General, this.chatService.getMessages());
  }

  @SubscribeMessage(ChatMode.General)
  async handleMessage(client: Socket, message: ChatMessage) {
    const user = await this.authService.getUserData(message.userId);
  
    const savedMessage = this.chatService.addMessage(user, message);
    if (savedMessage) this.wsServer.emit(ChatMode.General, [savedMessage]);
  }

  async handleDisconnect(client: Socket) {
    this.disconnect(client);
  }

  private async authorize(socket: Socket): Promise<UserDto | null> {
    const userFromToken = await this.authService.getUserFromToken(socket.handshake.headers.authorization);
    if (!userFromToken) { return null; };

    const user = await this.authService.getUserData(userFromToken.id);
    if (!user) { this.disconnect(socket); return null; };
    return user;
  }

  private disconnect(socket: Socket) {
    socket.emit(ChatMode.Error, new UnauthorizedException());
    socket.disconnect();
  }
}
