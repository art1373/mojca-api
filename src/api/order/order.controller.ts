import {
  Controller,
  Get,
  Post,
  Delete,
  CacheInterceptor,
  UseInterceptors,
  Inject,
  ClassSerializerInterceptor,
  UseGuards,
  Body,
  Req,
  Param,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Role, Roles } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@Controller('order')
export class OrderController {
  @Inject(OrderService)
  private readonly orderService: OrderService;

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  private createOrder(
    @Req() req,
    @Body() body: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  private findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('userOrders')
  private findAllUserOrders(@Req() req): Promise<Order[]> {
    return this.orderService.getAllUserOrders(req);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  private findOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  private deleteOrder(@Param('id') id: string, @Res() res) {
    return this.orderService.deleteOrder(id, res);
  }
}
