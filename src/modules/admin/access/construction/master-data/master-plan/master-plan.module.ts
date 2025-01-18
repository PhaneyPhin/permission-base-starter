import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPlanController } from './master-plan.controller';
import { MasterPlanService } from './master-plan.service';
import { MasterPlanEntity } from './master-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterPlanEntity])],
  controllers: [MasterPlanController],
  providers: [MasterPlanService],
})
export class MasterPlanModule {}
