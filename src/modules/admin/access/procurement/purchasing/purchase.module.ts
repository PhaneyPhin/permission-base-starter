import { Module } from "@nestjs/common";
import { PurchaseOrderModule } from "./purchase-order/purchase-order.module";
import { PurchaseQuotationModule } from "./purchase-quotation/purchase-quotation.module";
import { PurchaseReceiptModule } from "./purchase-receipt/purchase-receipt.module";
import { PurchaseRequestModule } from "./purchase-request/purchase-request.module";

@Module({
  imports: [
    PurchaseQuotationModule,
    PurchaseRequestModule,
    PurchaseOrderModule,
    PurchaseReceiptModule,
  ],
})
export class PurchaseModule {}
