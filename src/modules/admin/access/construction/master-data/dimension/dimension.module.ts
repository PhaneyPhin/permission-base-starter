import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimensionController } from './dimension.controller';
import { DimensionService } from './dimension.service';
import { DimensionEntity } from './dimension.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DimensionEntity])],
  controllers: [DimensionController],
  providers: [DimensionService],
})
export class DimensionModule {}
