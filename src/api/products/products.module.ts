import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
