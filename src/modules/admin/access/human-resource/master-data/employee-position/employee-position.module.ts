import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeePositionController } from './employee-position.controller';
import { EmployeePositionService } from './employee-position.service';
import { EmployeePositionEntity } from './employee-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeePositionEntity])],
  controllers: [EmployeePositionController],
  providers: [EmployeePositionService],
})
export class EmployeePositionModule {}
