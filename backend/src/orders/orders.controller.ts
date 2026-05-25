import { Controller, Get, Post, Body, UseGuards, Request, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() orderData: any) {
    return this.ordersService.create(req.user.userId, orderData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    return this.ordersService.findByUser(req.user.userId);
  }

  // Ruta secreta para el simulador de Nequi
  @Patch(':id/confirm-nequi')
  confirmNequi(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.confirmPayment(id);
  }
}
