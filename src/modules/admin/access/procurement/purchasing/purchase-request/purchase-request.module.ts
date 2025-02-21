import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequestController } from './purchase-request.controller';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestEntity } from './purchase-request.entity';
import { PurchaseRequestItemEntity } from './purchase-request-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PurchaseRequestEntity,
    PurchaseRequestItemEntity,
  ])],
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestService],
})
export class PurchaseRequestModule {}