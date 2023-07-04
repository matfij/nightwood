import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { ChatMessage, ChatMode } from './model/chat';
import { ChatService } from './service/chat.service';
import { WsThrottlerGuard } from './service/ws-throttler.guard';

@WebSocketGateway({ cors: { origin: '*' } })
@UseGuards(WsThrottlerGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wsServer: Server;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      await this.authService.getUserFromToken(socket.handshake.headers.authorization);
      socket.emit(ChatMode.General, this.chatService.getMessages());
    } catch (err) {
      return socket.disconnect();
    }
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

  private disconnect(socket: Socket) {
    socket.emit(ChatMode.Error, new UnauthorizedException());
    socket.disconnect();
  }
}
