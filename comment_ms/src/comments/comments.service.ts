import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor() {}

  async createComment(data: any) {
    const newComment = new Comment();

    newComment.uuid = uuidv4();
    newComment.content = data.content;
    newComment.post_uuid = data.post_uuid;
    newComment.author_uuid = data.author_uuid;

    await newComment.save();

    return newComment;
  }

  async getComments() {
    return await Comment.find();
  }

  async getPostComments(uuid: string) {
    return await Comment.find({ where: { post_uuid: uuid } });
  }

  async getOneComment(uuid: string) {
    return await Comment.findOne({ where: { uuid } });
  }
}
