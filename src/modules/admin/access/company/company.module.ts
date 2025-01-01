import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), MinioModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
