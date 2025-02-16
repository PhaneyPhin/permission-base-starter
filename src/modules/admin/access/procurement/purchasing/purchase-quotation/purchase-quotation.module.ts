import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseQuotationItemEntity } from "./purchase-quotation-item.entity";
import { PurchaseQuotationController } from "./purchase-quotation.controller";
import { PurchaseQuotationEntity } from "./purchase-quotation.entity";
import { PurchaseQuotationService } from "./purchase-quotation.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseQuotationEntity,
      PurchaseQuotationItemEntity,
    ]),
  ],
  controllers: [PurchaseQuotationController],
  providers: [PurchaseQuotationService],
})
export class PurchaseQuotationModule {}
