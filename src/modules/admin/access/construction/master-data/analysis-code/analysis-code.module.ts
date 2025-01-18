import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisCodeController } from './analysis-code.controller';
import { AnalysisCodeService } from './analysis-code.service';
import { AnalysisCodeEntity } from './analysis-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisCodeEntity])],
  controllers: [AnalysisCodeController],
  providers: [AnalysisCodeService],
})
export class AnalysisCodeModule {}
