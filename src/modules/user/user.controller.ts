// src/users/users.controller.ts
import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

import { UsersService } from './users.service';
import { Role } from 'common/enums/role.enum';
import { Roles } from 'common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get')
  @Roles(Role.User,Role.Admin)
  get(): String{
    return "Hello world"
  }
}
