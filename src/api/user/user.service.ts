import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { AuthHelper } from '../auth/auth.helper';

@Injectable()
export class UserService {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateUser(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = req.user as User;

    user.name = body.name;
    user.email = body.email;
    if (body.password) {
      user.password = this.helper.encodePassword(body.password);
    }

    return this.repository.save(user);
  }
}
