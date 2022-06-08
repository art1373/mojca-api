import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  public async getAllUsers(): Promise<User[]> {
    return await this.repository.find({ where: {} });
  }

  public async getUser(id: string): Promise<User> {
    const user: User = await this.repository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return user;
  }

  public async updateUser(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = req.user as User;

    user.name = body.name;
    user.email = body.email;
    user.roles = body.roles;
    if (body.password) {
      user.password = this.helper.encodePassword(body.password);
    }

    return this.repository.save(user);
  }

  public async deleteUser(id: string, res) {
    const user: User = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    this.repository.remove(user);

    return res.send({
      message: 'user deleted!',
      user,
    });
  }
}
