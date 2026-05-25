import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateProductDto) {
    const { images, ...productData } = dto;
    
    const product = await this.prisma.product.create({
      data: {
        ...productData,
        userId,
      },
    });

    if (images && images.length > 0) {
      await this.prisma.productImage.createMany({
        data: images.map(url => ({
          url,
          productId: product.id,
        })),
      });
    }

    return this.findOne(product.id);
  }

  async findAll(query: { search?: string; category?: string; minPrice?: number; maxPrice?: number }) {
    const { search, category, minPrice, maxPrice } = query;

    return this.prisma.product.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ]
          } : {},
          category ? { category } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        ]
      },
      include: {
        images: true,
        user: {
          select: {
            name: true,
            location: true,
            community: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        user: {
          select: {
            name: true,
            bio: true,
            location: true,
            community: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
}
