import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async createUser(data: CreateUserInput) {
    const hashedPw = await bcrypt.hash(data.password, 10);
    const newUser = new User();

    newUser.uuid = uuidv4();
    newUser.username = data.username;
    newUser.password = hashedPw;

    await newUser.save();

    return newUser;
  }

  async findOne(username: string) {
    return await User.findOne({ where: { username } });
  }

  async findAllUsers(user) {
    console.log(user);
    return User.find();
  }

  async findUserByUuid(uuid: string) {
    return User.findOne({ where: { uuid } });
  }
}
