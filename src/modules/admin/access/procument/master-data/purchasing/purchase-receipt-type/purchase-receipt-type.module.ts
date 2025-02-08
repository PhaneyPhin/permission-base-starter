import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseReceiptTypeController } from './purchase-receipt-type.controller';
import { PurchaseReceiptTypeService } from './purchase-receipt-type.service';
import { PurchaseReceiptTypeEntity } from './purchase-receipt-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseReceiptTypeEntity])],
  controllers: [PurchaseReceiptTypeController],
  providers: [PurchaseReceiptTypeService],
})
export class PurchaseReceiptTypeModule {}
