import { Module } from '@nestjs/common';
import { ErrorService } from 'src/common/services/error.service';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    ChatGateway,
    ChatService,
    ErrorService,
  ],
})
export class ChatModule {}
