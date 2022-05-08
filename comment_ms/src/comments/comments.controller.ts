import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @EventPattern('createComment')
  async createComment(data: any) {
    await this.commentsService.createComment(data);
  }

  @MessagePattern({ cmd: 'getComments' })
  async getComments() {
    return await this.commentsService.getComments();
  }

  @MessagePattern({ cmd: 'getPostComments' })
  async getPostComments(@Payload('uuid') uuid: string) {
    return await this.commentsService.getPostComments(uuid);
  }

  @MessagePattern({ cmd: 'getOneComment' })
  async getOneComment(@Payload('uuid') uuid: string) {
    return await this.commentsService.getOneComment(uuid);
  }
}
