import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public async getAllProducts(): Promise<Product[]> {
    return await this.repository.find({ where: {} });
  }

  public async getProduct(id: string): Promise<Product> {
    const product = await this.repository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  public async deleteProduct(id: string) {
    const product = await this.repository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }

    return this.repository.remove(product);
  }

  public async createProduct(body: CreateProductDto) {
    const { name, description, quantity, unitPrice, currency } =
      body as Product;

    const product: CreateProductDto = {
      name,
      description,
      unitPrice,
      quantity,
      currency,
    };

    return this.repository.save(product);
  }

  public async updateProduct(
    body: UpdateProductDto,
    id: string,
  ): Promise<Product> {
    const product: Product = await this.repository.findOne({ where: { id } });

    if (!product) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }
    if (Object.keys(body).length <= 0) {
      throw new HttpException('Invalid entries!', HttpStatus.BAD_REQUEST);
    }
    product.currency = body.currency;
    product.description = body.description;
    product.name = body.name;
    product.unitPrice = body.unitPrice;
    product.quantity = body.quantity;

    return this.repository.save(product);
  }
}
