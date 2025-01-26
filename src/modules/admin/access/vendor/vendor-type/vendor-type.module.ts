import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorTypeController } from './vendor-type.controller';
import { VendorTypeService } from './vendor-type.service';
import { VendorTypeEntity } from './vendor-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorTypeEntity])],
  controllers: [VendorTypeController],
  providers: [VendorTypeService],
})
export class VendorTypeModule {}
