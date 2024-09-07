import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@CurrentUser() user: UserDocument) {
    return user;
  }
}
