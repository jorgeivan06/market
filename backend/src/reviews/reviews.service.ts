import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, productId: number, data: any) {
    return this.prisma.review.create({
      data: {
        userId,
        productId,
        rating: data.rating,
        comment: data.comment,
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });
  }

  async findByProduct(productId: number) {
    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
