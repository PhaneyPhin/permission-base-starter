import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuationMethodController } from './valuation-method.controller';
import { ValuationMethodService } from './valuation-method.service';
import { ValuationMethodEntity } from './valuation-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValuationMethodEntity])],
  controllers: [ValuationMethodController],
  providers: [ValuationMethodService],
})
export class ValuationMethodModule {}
