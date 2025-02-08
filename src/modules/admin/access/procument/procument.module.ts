import { Module } from "@nestjs/common";
import { ItemModule } from "./item/item.module";
import { CategoryModule } from "./master-data/category/category.module";
import { ItemGroupModule } from "./master-data/item-group/item-group.module";
import { PurchasingModule } from "./master-data/purchasing/purchasing.module";
import { UomModule } from "./master-data/uom/uom.module";

@Module({
  imports: [
    ItemGroupModule,
    UomModule,
    CategoryModule,
    ItemModule,
    PurchasingModule,
  ],
})
export class ProcumentModule {}
console.log("Purchasing");
