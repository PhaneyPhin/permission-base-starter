import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorClassController } from './vendor-class.controller';
import { VendorClassService } from './vendor-class.service';
import { VendorClassEntity } from './vendor-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorClassEntity])],
  controllers: [VendorClassController],
  providers: [VendorClassService],
})
export class VendorClassModule {}
