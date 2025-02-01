import { Module } from "@nestjs/common";
import { BankModule } from "./bank/bank.module";
import { PaymentMethodModule } from "./payment-method/payment-method.module";
import { PaymentTermModule } from "./payment-term/payment-term.module";

@Module({
  imports: [BankModule, PaymentMethodModule, PaymentTermModule],
})
export class BankClassificationModule {}
