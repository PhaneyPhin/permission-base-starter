import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfileController } from './staff-profile.controller';
import { StaffProfileService } from './staff-profile.service';
import { StaffProfileEntity } from './staff-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffProfileEntity])],
  controllers: [StaffProfileController],
  providers: [StaffProfileService],
})
export class StaffProfileModule {}
