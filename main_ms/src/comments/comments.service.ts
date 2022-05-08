import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentInput } from './dto/comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS') private readonly commentsClient: ClientProxy,
  ) {}

  createComment(data: CreateCommentInput) {
    return this.commentsClient.emit<CreateCommentInput>('createComment', data);
  }

  getComments() {
    return this.commentsClient.send<string>({ cmd: 'getComments' }, {});
  }

  getPostComments(uuid: string) {
    return this.commentsClient.send<string>(
      { cmd: 'getPostComments' },
      { uuid },
    );
  }

  getOneComment(uuid: string) {
    return this.commentsClient.send<string>({ cmd: 'getOneComment' }, { uuid });
  }
}
