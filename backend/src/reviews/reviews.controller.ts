import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':productId')
  create(
    @Request() req, 
    @Param('productId', ParseIntPipe) productId: number,
    @Body() data: any
  ) {
    return this.reviewsService.create(req.user.userId, productId, data);
  }

  @Get(':productId')
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.findByProduct(productId);
  }
}
