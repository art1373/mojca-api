import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { hashPassowrd } from './utils/passwordUtils';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    const isUserExist = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (isUserExist) {
      throw new HttpException('User already exist!', HttpStatus.BAD_REQUEST);
    }

    user.name = body.name;
    user.email = body.email;
    user.password = await hashPassowrd(body.password);

    const userSaved = await this.userRepository.save(user);
    delete userSaved.password;
    return userSaved;
  }

  public async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return this.userRepository.delete(user.id);
    }
    throw new HttpException('Could not delete user!', HttpStatus.NOT_FOUND);
  }
}
