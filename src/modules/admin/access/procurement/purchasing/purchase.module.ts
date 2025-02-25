import { Module } from "@nestjs/common";
import { PurchaseQuotationModule } from "./purchase-quotation/purchase-quotation.module";
import { PurchaseRequestModule } from "./purchase-request/purchase-request.module";
import { PurchaseOrderModule } from "./purchase-order/purchase-order.module";

@Module({
  imports: [PurchaseQuotationModule, PurchaseRequestModule, PurchaseOrderModule],
})
export class PurchaseModule {}
