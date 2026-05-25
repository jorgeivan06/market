import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    if (req.user.role !== 'SELLER' && req.user.role !== 'ADMIN') {
      throw new Error('Solo los artesanos pueden subir productos');
    }
    return this.productsService.create(req.user.userId, createProductDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productsService.findAll({ search, category, minPrice, maxPrice });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
