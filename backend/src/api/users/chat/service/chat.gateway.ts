import { UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from '../../auth/util/jwt.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wsServer;

  async handleConnection(socket: Socket) {
    console.log('Chat connected')
    this.wsServer.emit('message', 'server message')
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    console.log('Message received')
    this.wsServer.emit('message', 'server message')
  }

  async handleDisconnect(client: any) {
      console.log('Chat disconected')
  }
}
