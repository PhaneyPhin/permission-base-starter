import { Module } from "@nestjs/common";
import { VendorClassModule } from "./vendor-class/vendor-class.module";
import { VendorTypeModule } from "./vendor-type/vendor-type.module";

@Module({
  imports: [VendorTypeModule, VendorClassModule],
})
export class VendorModule {}
