import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @EventPattern('createPost')
  async createPost(data: any) {
    await this.postsService.createPost(data);
  }

  @MessagePattern({ cmd: 'getPosts' })
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @MessagePattern({ cmd: 'getOnePost' })
  async getOnePost(@Payload('uuid') uuid: string) {
    return await this.postsService.getOnePost(uuid);
  }
}
