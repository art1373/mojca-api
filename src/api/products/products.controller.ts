import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { CreateProductDto } from './products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  @Inject(ProductsService)
  private readonly service: ProductsService;

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  private getAllProducts(): Promise<Product[]> {
    return this.service.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  private getProduct(@Param('id') id: string): Promise<Product> {
    return this.service.getProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  private deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('product')
  private createProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.service.createProduct(body);
  }
}
