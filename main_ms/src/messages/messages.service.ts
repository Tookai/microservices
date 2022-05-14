import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  async createMessage(createMessageDto: CreateMessageDto) {
    const newMessage = new Message();

    newMessage.content = createMessageDto.content;
    newMessage.conversationId = createMessageDto.conversationId;

    await newMessage.save();

    return newMessage;
  }
}
