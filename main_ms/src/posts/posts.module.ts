import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS',
        transport: Transport.TCP,
        options: { port: 5555 },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
