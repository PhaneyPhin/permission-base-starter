import { Module } from "@nestjs/common";
import { VendorTypeModule } from "./vendor-type/vendor-type.module";

@Module({
  imports: [VendorTypeModule],
})
export class VendorModule {}
