import { Module } from '@nestjs/common';
import { EmployeePositionModule } from './master-data/employee-position/employee-position.module';
import { EmployeeModule } from './master-data/employee/employee.module';

@Module({
    imports: [
        EmployeePositionModule,
        EmployeeModule
    ]
})
export class HumanResourceModule {}
