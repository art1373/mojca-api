import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateUser(
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUser(body, req);
  }
}
