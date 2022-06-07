import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Role, Roles } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { CreateProductDto, UpdateProductDto } from './products.dto';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  private updateProduct(
    @Body() body: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return this.service.updateProduct(body, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  private deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('product')
  private createProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.service.createProduct(body);
  }
}
