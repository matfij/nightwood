import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { ChatMode } from './chat.definitions';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  chatMode: ChatMode = ChatMode.General;
  activeUsers: string[] = [];

  @WebSocketServer()
  wsServer: Server;

  constructor(
    private authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    const user = await this.authService.getUser(socket.handshake.headers.authorization);
    if (!user) this.disconnect(socket);
    
    this.activeUsers.push(user.nickname);
    this.wsServer.emit(this.chatMode, `${this.activeUsers} are online.`);
    console.log(this.activeUsers)
  }

  @SubscribeMessage(ChatMode)
  async handleMessage(client: any, payload: any) {
    console.log('Message received')
    this.wsServer.emit(this.chatMode, 'server message')
  }

  async handleDisconnect(client: any) {
    this.disconnect(client);
  }

  private disconnect(socket: Socket) {
    socket.emit(ChatMode.Error, new UnauthorizedException());
    socket.disconnect();
  }
}
