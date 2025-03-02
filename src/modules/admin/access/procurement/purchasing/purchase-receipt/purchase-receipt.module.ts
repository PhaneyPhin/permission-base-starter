import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseReceiptItemEntity } from "./purchase-receipt-item.entity";
import { PurchaseReceiptController } from "./purchase-receipt.controller";
import { PurchaseReceiptEntity } from "./purchase-receipt.entity";
import { PurchaseReceiptService } from "./purchase-receipt.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseReceiptEntity,
      PurchaseReceiptItemEntity,
    ]),
  ],
  controllers: [PurchaseReceiptController],
  providers: [PurchaseReceiptService],
})
export class PurchaseReceiptModule {}
