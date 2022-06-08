import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Product } from '../products/products.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsArray()
  public readonly orderItems: Product[];
}
