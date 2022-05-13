import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsGateway } from './conversations.gateway';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [ConversationsGateway, ConversationsService],
})
export class ConversationsModule {}
