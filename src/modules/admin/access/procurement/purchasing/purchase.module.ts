import { Module } from "@nestjs/common";
import { PurchaseQuotationModule } from "./purchase-quotation/purchase-quotation.module";
import { PurchaseRequestModule } from "./purchase-request/purchase-request.module";

@Module({
  imports: [PurchaseQuotationModule, PurchaseRequestModule],
})
export class PurchaseModule {}
