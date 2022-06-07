import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../auth/roles/role.decorator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsEmail()
  public readonly email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  public readonly password?: string;

  @IsEnum(Role)
  @IsOptional()
  public readonly roles?: Role;
}
