import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { calculateTotalPrice } from './order.helper';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public async createOrder(
    req: Request,
    { orderItems }: CreateOrderDto,
  ): Promise<Order> {
    if (!orderItems)
      throw new HttpException('Invalid items', HttpStatus.BAD_REQUEST);
    const user = req.user as User;
    const body = {
      orderItems,
      userId: user.id,
      totalPrice: calculateTotalPrice(orderItems) ?? 0,
    };

    const order = this.repository.create(body);
    return this.repository.save(order);
  }

  public async findAllOrders(): Promise<Order[]> {
    return await this.repository.find({ where: {} });
  }

  public async getAllUserOrders(req: Request): Promise<Order[]> {
    const user: User = req.user as User;
    return await this.repository.findBy({ userId: user.id });
  }

  public async findOrder(id: string): Promise<Order> {
    const order: Order = await this.repository.findOne({ where: { id } });
    if (!order)
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);

    return order;
  }

  public async deleteOrder(id: string, res) {
    const order: Order = await this.repository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
    }

    await this.repository.remove(order);

    return res.send({
      message: 'order deleted!',
      order,
    });
  }
}
