import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/service/auth.service';
import { JwtAuthGuard } from '../auth/util/jwt.guard';
import { UserService } from '../user/service/user.service';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
    this.wsServer.emit('message', `${this.activeUsers} are online.`);
    console.log(this.activeUsers)
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    console.log('Message received')
    this.wsServer.emit('message', 'server message')
  }

  async handleDisconnect(client: any) {
    this.disconnect(client);
  }

  private disconnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }
}
