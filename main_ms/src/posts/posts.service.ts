import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostInput } from './dto/post.input';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS') private readonly postsClient: ClientProxy) {}

  createPost(data: CreatePostInput) {
    return this.postsClient.emit<CreatePostInput>('createPost', data);
  }

  getPosts() {
    return this.postsClient.send<string>({ cmd: 'getPosts' }, {});
  }

  getOnePost(uuid: string) {
    return this.postsClient.send<string>({ cmd: 'getOnePost' }, { uuid });
  }
}
