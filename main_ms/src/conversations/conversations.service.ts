import { Injectable } from '@nestjs/common';
import { Conversation } from 'src/entities/conversation.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConversationsService {
  async createConversation(userUuid: string, currentUserUuid: string) {
    const conversation = await Conversation.findOne({
      where: {
        users: {
          $all: [userUuid, currentUserUuid],
        },
      },
    });

    if (!conversation) {
      const newConversation = new Conversation();
      newConversation.uuid = uuidv4();
      newConversation.users = [userUuid, currentUserUuid];
      newConversation.save();
      return newConversation;
    }

    return conversation;
  }

  async findAllConversations(currentUserUuid: string) {
    const conversations = await Conversation.find({
      where: {
        users: {
          $all: [currentUserUuid],
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return conversations;
  }
}
