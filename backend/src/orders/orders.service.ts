import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    return this.prisma.order.create({
      data: {
        userId,
        total: data.total,
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        phone: data.phone,
        status: data.paymentMethod === 'nequi' ? 'WAITING_NEQUI' : 'PAID',
        paymentId: data.nequiPhone || null, // Guardamos el celular como ID de pago temporal
        items: {
          create: data.items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.id,
          })),
        },
      },
      include: { items: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: { include: { images: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Simulador de Webhook de Nequi
  async confirmPayment(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PAID' },
    });
  }
}
