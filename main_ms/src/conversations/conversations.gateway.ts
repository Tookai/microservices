import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ConversationsService } from './conversations.service';

@WebSocketGateway()
export class ConversationsGateway {
  constructor(private readonly conversationsService: ConversationsService) {}

  @WebSocketServer()
  server: any;
}
