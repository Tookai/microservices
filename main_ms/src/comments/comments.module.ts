import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENTS',
        transport: Transport.TCP,
        options: { port: 5550 },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
