import { Module } from '@nestjs/common';
import { ChatGateway } from './service/chat.gateway';

@Module({
  providers: [ChatGateway]
})
export class ChatModule {}
