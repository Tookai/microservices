import { Body, Controller, Post } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
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
  async createMessage(@Body() data) {
    const message = await this.messagesService.createMessage(data);
    this.messagesGateway.server.emit(
      `message-${message.conversationId}`,
      message,
    );
    return message;
  }
}
