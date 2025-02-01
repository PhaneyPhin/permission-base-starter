import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermController } from './payment-term.controller';
import { PaymentTermService } from './payment-term.service';
import { PaymentTermEntity } from './payment-term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTermEntity])],
  controllers: [PaymentTermController],
  providers: [PaymentTermService],
})
export class PaymentTermModule {}
