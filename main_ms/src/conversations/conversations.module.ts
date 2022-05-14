import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsGateway } from './conversations.gateway';
import { ConversationsController } from './conversations.controller';

@Module({
  providers: [ConversationsGateway, ConversationsService],
  controllers: [ConversationsController]
})
export class ConversationsModule {}
