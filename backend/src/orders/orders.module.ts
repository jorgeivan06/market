import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { WompiService } from './wompi.service';

@Module({
  providers: [OrdersService, WompiService],
  controllers: [OrdersController],
})
export class OrdersModule {}
