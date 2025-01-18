import { Module } from '@nestjs/common';
import { AnalysisCodeModule } from './analysis-code/analysis-code.module';
import { MasterPlanModule } from './master-plan/master-plan.module';
import { DimensionModule } from './dimension/dimension.module';

@Module({
    imports: [
        DimensionModule,
        AnalysisCodeModule,
        MasterPlanModule
    ]
})
export class MasterDataModule {}
