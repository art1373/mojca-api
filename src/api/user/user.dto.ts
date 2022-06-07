import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../auth/roles/role.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  public readonly email?: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(8)
  @IsOptional()
  public readonly password?: string;

  @ApiPropertyOptional()
  @IsEnum(Role, { message: 'Invalid role provided!' })
  @IsOptional()
  public readonly roles?: Role;
}
