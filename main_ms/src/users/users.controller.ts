import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() data: CreateUserInput) {
    return this.usersService.createUser(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUsers(@CurrentUser() user: User) {
    return this.usersService.findAllUsers(user);
  }

  @Get('/:uuid')
  findUserByUuid(@Param('uuid') uuid: string) {
    return this.usersService.findUserByUuid(uuid);
  }
}
