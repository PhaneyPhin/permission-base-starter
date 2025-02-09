import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderTypeController } from './purchase-order-type.controller';
import { PurchaseOrderTypeService } from './purchase-order-type.service';
import { PurchaseOrderTypeEntity } from './purchase-order-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderTypeEntity])],
  controllers: [PurchaseOrderTypeController],
  providers: [PurchaseOrderTypeService],
})
export class PurchaseOrderTypeModule {}
