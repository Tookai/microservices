import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostInput } from './dto/post.input';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() data: CreatePostInput) {
    return this.postsService.createPost(data);
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:uuid')
  getOnePost(@Param('uuid') uuid: string) {
    return this.postsService.getOnePost(uuid);
  }
}
