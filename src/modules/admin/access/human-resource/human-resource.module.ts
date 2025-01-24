import { Module } from '@nestjs/common';
import { EmployeePositionModule } from './master-data/employee-position/employee-position.module';
import { PositionModule } from './master-data/position/position.module';
import { NationalityModule } from './master-data/nationality/nationality.module';
import { StaffProfileModule } from './staff-profile/staff-profile.module';

@Module({
    imports: [
        EmployeePositionModule,
        PositionModule,
        NationalityModule,
        StaffProfileModule
    ]
})
export class HumanResourceModule {}
