import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  findAll() {
    return this.prisma.product.findMany({
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
