import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { ConversationsGateway } from './conversations.gateway';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly conversationsGateway: ConversationsGateway,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Body('userUuid') userUuid: string,
    @CurrentUser() currentUser: User,
  ) {
    const conversation = await this.conversationsService.createConversation(
      userUuid,
      currentUser.uuid,
    );
    this.conversationsGateway.server.emit(`conversation-${userUuid}`);
    this.conversationsGateway.server.emit(
      `conversation-${currentUser.uuid}`,
    );
    return conversation;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllConversations(@CurrentUser() currentUser: User) {
    return this.conversationsService.findAllConversations(currentUser.uuid);
  }
}
