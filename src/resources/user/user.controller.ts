import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto } from './dto';

import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/me')
  async findMe(): Promise<UserRO | undefined> {
    return await this.userService.findByEmail('');
  }

  @Get('users/:email')
  async findUser(@Param('email') email: string): Promise<UserRO | undefined> {
    return await this.userService.findByEmail(email);
  }

  @Get('users')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
