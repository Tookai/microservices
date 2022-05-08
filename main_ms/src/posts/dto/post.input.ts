import { IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  author_uuid: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
