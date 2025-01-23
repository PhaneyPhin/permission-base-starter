import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationalityController } from './nationality.controller';
import { NationalityService } from './nationality.service';
import { NationalityEntity } from './nationality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NationalityEntity])],
  controllers: [NationalityController],
  providers: [NationalityService],
})
export class NationalityModule {}
