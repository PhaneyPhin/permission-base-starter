import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorBankEntity } from "./vendor-bank/vendor-bank.entity";
import { VendorClassModule } from "./vendor-class/vendor-class.module";
import { VendorTypeModule } from "./vendor-type/vendor-type.module";
import { VendorController } from "./vendor/vendor.controller";
import { VendorEntity } from "./vendor/vendor.entity";
import { VendorService } from "./vendor/vendor.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorEntity, VendorBankEntity]),
    VendorTypeModule,
    VendorClassModule,
    VendorModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
