import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor() {}

  async createPost(data: any) {
    const newPost = new Post();

    newPost.uuid = uuidv4();
    newPost.title = data.title;
    newPost.content = data.content;
    newPost.author_uuid = data.author_uuid;

    await newPost.save();

    return newPost;
  }

  async getPosts() {
    return await Post.find();
  }

  async getOnePost(uuid: string) {
    return await Post.findOne({ where: { uuid } });
  }
}
