import { Injectable } from '@nestjs/common';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/messages.entity';
import { User } from 'src/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  async createMessage(createMessageDto: CreateMessageDto, currentUser: User) {
    const newMessage = new Message();
    const conversation = await Conversation.findOne({
      where: { uuid: createMessageDto.conversationId },
    });

    newMessage.content = createMessageDto.content;
    newMessage.conversationId = createMessageDto.conversationId;
    newMessage.author = currentUser.username;
    newMessage.authorId = currentUser.uuid;

    conversation.updatedAt = new Date();

    await conversation.save();
    await newMessage.save();

    return newMessage;
  }

  async findLastMessage(conversationId: string) {
    return await Message.find({
      where: { conversationId },
      order: { createdAt: 'DESC' },
      take: 1,
    });
  }

  async findAllMessageFromConv(conversationId: string) {
    return await Message.find({
      where: { conversationId },
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }
}
