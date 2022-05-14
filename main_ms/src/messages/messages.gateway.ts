import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  @WebSocketServer()
  server: any;
}
