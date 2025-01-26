import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorBankController } from './vendor-bank.controller';
import { VendorBankService } from './vendor-bank.service';
import { VendorBankEntity } from './vendor-bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorBankEntity])],
  controllers: [VendorBankController],
  providers: [VendorBankService],
})
export class VendorBankModule {}
