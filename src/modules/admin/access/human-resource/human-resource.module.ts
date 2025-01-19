import { Module } from '@nestjs/common';
import { EmployeePositionModule } from './master-data/employee-position/employee-position.module';

@Module({
    imports: [
        EmployeePositionModule
    ]
})
export class HumanResourceModule {}
