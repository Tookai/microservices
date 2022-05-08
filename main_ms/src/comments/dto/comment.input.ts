import { IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  author_uuid: string;

  @IsString()
  post_uuid: string;

  @IsString()
  content: string;
}
