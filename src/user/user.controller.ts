import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body('username') userName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.insertUser(userName, email, password);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers()
  }

  @Get(':id')
  async getUser(@Param('id') userId: string){
    return await this.userService.getUser(userId);
  }
}
