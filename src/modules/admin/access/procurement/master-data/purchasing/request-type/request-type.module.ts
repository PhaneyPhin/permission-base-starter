import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestTypeController } from './request-type.controller';
import { RequestTypeService } from './request-type.service';
import { RequestTypeEntity } from './request-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestTypeEntity])],
  controllers: [RequestTypeController],
  providers: [RequestTypeService],
})
export class RequestTypeModule {}
