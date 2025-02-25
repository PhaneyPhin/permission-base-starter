import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { PurchaseOrderItemEntity } from './purchase-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PurchaseOrderEntity,
    PurchaseOrderItemEntity,
  ])],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
