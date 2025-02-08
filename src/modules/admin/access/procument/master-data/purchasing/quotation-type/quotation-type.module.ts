import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationTypeController } from './quotation-type.controller';
import { QuotationTypeService } from './quotation-type.service';
import { QuotationTypeEntity } from './quotation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuotationTypeEntity])],
  controllers: [QuotationTypeController],
  providers: [QuotationTypeService],
})
export class QuotationTypeModule {}
