import { IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
