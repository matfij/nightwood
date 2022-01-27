import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {

  handleConnection() {
    console.log('Chat connected')
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('Message received')
    return 'Received: ' + payload.toString();
  }
}
