import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { ChatMessage, ChatMode } from './chat.definitions';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  SAVED_MESSAGES_LIMIT = 100;

  chatMode: ChatMode = ChatMode.General;
  savedMessages: ChatMessage[] = [];

  @WebSocketServer()
  wsServer: Server;

  constructor(
    private authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    if (!await this.authorize(socket)) return;
  
    socket.emit(this.chatMode, this.savedMessages);
  }

  @SubscribeMessage(ChatMode.General)
  async handleMessage(client: Socket, message: any) {
    if (!await this.authorize(client)) return;

    this.savedMessages.push(message);
    if (this.savedMessages.length > this.SAVED_MESSAGES_LIMIT) this.savedMessages.shift();
    this.wsServer.emit(this.chatMode, [message]);
  }

  async handleDisconnect(client: Socket) {
    this.disconnect(client);
  }

  private async authorize(socket: Socket): Promise<boolean> {
    const user = await this.authService.getUser(socket.handshake.headers.authorization);
    if (!user) { this.disconnect(socket); return false; };
    return true;
  }

  private disconnect(socket: Socket) {
    socket.emit(ChatMode.Error, new UnauthorizedException());
    socket.disconnect();
  }
}
