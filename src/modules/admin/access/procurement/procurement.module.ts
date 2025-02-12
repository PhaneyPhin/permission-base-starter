import { Module } from "@nestjs/common";
import { ItemModule } from "./item/item.module";
import { CategoryModule } from "./master-data/category/category.module";
import { ItemGroupModule } from "./master-data/item-group/item-group.module";
import { PurchasingModule } from "./master-data/purchasing/purchasing.module";
import { UomModule } from "./master-data/uom/uom.module";
import { ValuationMethodModule } from "./master-data/valuation-method/valuation-method.module";

@Module({
  imports: [
    ItemGroupModule,
    UomModule,
    CategoryModule,
    ItemModule,
    PurchasingModule,
    ValuationMethodModule,
  ],
})
export class ProcurementModule {}
