import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

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
}
