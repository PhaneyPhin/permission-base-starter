import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfileController } from './staff-profile.controller';
import { StaffProfileService } from './staff-profile.service';
import { StaffProfileEntity } from './staff-profile.entity';
import { BranchEntity } from '../../branch/branch.entity';
import { DepartmentEntity } from '../../department/department.entity';
import { EmployeePositionEntity } from '../master-data/employee-position/employee-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffProfileEntity, BranchEntity, DepartmentEntity, EmployeePositionEntity])],
  controllers: [StaffProfileController],
  providers: [StaffProfileService],
})
export class StaffProfileModule {}
