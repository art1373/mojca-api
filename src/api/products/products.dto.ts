import { Trim } from 'class-sanitizer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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
