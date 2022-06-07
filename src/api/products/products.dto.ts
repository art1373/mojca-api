import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(3)
  public readonly name: string;

  @ApiProperty()
  @IsString()
  public readonly currency: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(120)
  public readonly description: string;

  @ApiProperty()
  @IsNumber()
  public readonly unitPrice: number;

  @ApiProperty()
  @IsNumber()
  public readonly quantity: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @Trim()
  @IsString()
  @MinLength(3)
  @IsOptional()
  public readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly currency: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(120)
  @IsOptional()
  public readonly description: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  public readonly unitPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  public readonly quantity: number;
}
