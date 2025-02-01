import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankModule } from "./bank/bank.module";
import { PaymentMethodModule } from "./payment-method/payment-method.module";
import { PaymentTermModule } from "./payment-term/payment-term.module";
import { VendorClassModule } from "./vendor-class/vendor-class.module";
import { VendorTypeModule } from "./vendor-type/vendor-type.module";
import { VendorController } from "./vendor/vendor.controller";
import { VendorEntity } from "./vendor/vendor.entity";
import { VendorService } from "./vendor/vendor.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorEntity]),
    VendorTypeModule,
    VendorClassModule,
    BankModule,
    PaymentMethodModule,
    PaymentTermModule,
    VendorModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
