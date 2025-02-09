import { Module } from "@nestjs/common";
import { PurchaseOrderTypeModule } from "./purchase-order-type/purchase-order-type.module";
import { PurchaseReceiptTypeModule } from "./purchase-receipt-type/purchase-receipt-type.module";
import { QuotationTypeModule } from "./quotation-type/quotation-type.module";
import { RequestTypeModule } from "./request-type/request-type.module";

@Module({
  imports: [
    RequestTypeModule,
    QuotationTypeModule,
    PurchaseOrderTypeModule,
    PurchaseReceiptTypeModule,
  ],
})
export class PurchasingModule {}
