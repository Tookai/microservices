import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Controller('messages')
@WebSocketGateway({ cors: true })
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessage(@Body() data, @CurrentUser() currentUser: User) {
    const message = await this.messagesService.createMessage(data, currentUser);
    this.messagesGateway.server.emit(
      `message-${message.conversationId}`,
      message,
    );
    return message;
  }

  @Get('/msg/:uuid')
  @UseGuards(JwtAuthGuard)
  async findLastMessage(@Param('uuid') conversationId: string) {
    return this.messagesService.findLastMessage(conversationId);
  }

  @Get('/conv/:uuid')
  @UseGuards(JwtAuthGuard)
  async findAllMessageFromConv(@Param('uuid') conversationId: string) {
    return this.messagesService.findAllMessageFromConv(conversationId);
  }
}
