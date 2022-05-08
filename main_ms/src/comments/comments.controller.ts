import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/comment.input';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body() data: CreateCommentInput) {
    return this.commentsService.createComment(data);
  }

  @Get()
  getComments() {
    return this.commentsService.getComments();
  }

  @Get('post/:uuid')
  getPostComments(@Param('uuid') uuid: string) {
    return this.commentsService.getPostComments(uuid);
  }

  @Get('/:uuid')
  getOneComment(@Param('uuid') uuid: string) {
    return this.commentsService.getOneComment(uuid);
  }
}
