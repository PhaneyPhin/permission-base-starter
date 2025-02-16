import { Module } from "@nestjs/common";
import { PurchaseQuotationModule } from "./purchase-quotation/purchase-quotation.module";

@Module({
  imports: [PurchaseQuotationModule],
})
export class PurchaseModule {}
