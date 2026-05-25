import { Controller, Get, Post, Body, UseGuards, Request, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { WompiService } from './wompi.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly wompiService: WompiService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() orderData: any) {
    const order = await this.ordersService.create(req.user.userId, orderData);
    
    // Si el usuario elige Wompi (Nequi/PSE), generamos la firma de seguridad
    if (orderData.useWompi) {
      const reference = `ANS-${order.id}-${Date.now()}`;
      const signature = this.wompiService.generateIntegritySignature(reference, order.total);
      
      return {
        ...order,
        wompiConfig: {
          publicKey: this.wompiService.getPublicKey(),
          reference,
          signature,
          amountInCents: order.total * 100,
        }
      };
    }

    return order;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    return this.ordersService.findByUser(req.user.userId);
  }

  @Patch(':id/confirm-nequi')
  confirmNequi(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.confirmPayment(id);
  }

  // Webhook para recibir notificaciones reales de Wompi
  @Post('webhook')
  async handleWompiWebhook(@Body() payload: any) {
    console.log('Evento recibido de Wompi:', payload);
    const { data } = payload;
    
    if (data.transaction.status === 'APPROVED') {
       // Aquí extraeríamos el ID de la orden de la referencia (ej: ANS-12-...)
       const reference = data.transaction.reference;
       const orderId = parseInt(reference.split('-')[1]);
       await this.ordersService.confirmPayment(orderId);
    }
    
    return { status: 'ok' };
  }
}
