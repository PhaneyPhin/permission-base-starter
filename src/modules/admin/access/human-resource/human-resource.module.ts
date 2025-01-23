import { Module } from '@nestjs/common';
import { EmployeePositionModule } from './master-data/employee-position/employee-position.module';
import { EmployeeModule } from './master-data/employee/employee.module';
import { PositionModule } from './master-data/position/position.module';
import { NationalityModule } from './master-data/nationality/nationality.module';

@Module({
    imports: [
        EmployeePositionModule,
        EmployeeModule,
        PositionModule,
        NationalityModule,
    ]
})
export class HumanResourceModule {}
