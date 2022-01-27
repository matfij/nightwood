import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Chat started';
  }
}
