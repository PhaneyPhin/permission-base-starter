import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UomController } from './uom.controller';
import { UomService } from './uom.service';
import { UomEntity } from './uom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UomEntity])],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule {}
