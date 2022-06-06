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
  @Trim()
  @IsString()
  @MinLength(3)
  public readonly name: string;

  @IsString()
  public readonly currency: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  public readonly description: string;

  @IsNumber()
  public readonly unitPrice: number;

  @IsNumber()
  public readonly quantity: number;
}

export class UpdateProductDto {
  @Trim()
  @IsString()
  @MinLength(3)
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  public readonly currency: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  @IsOptional()
  public readonly description: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  public readonly unitPrice: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  public readonly quantity: number;
}
