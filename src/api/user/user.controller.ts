import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Delete,
  Res,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role, Roles } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  private deleteUser(@Param('id') id: string, @Res() res) {
    return this.service.deleteUser(id, res);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateUser(
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateUser(body, req);
  }
}
