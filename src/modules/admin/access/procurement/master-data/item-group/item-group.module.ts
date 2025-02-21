import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemGroupController } from './item-group.controller';
import { ItemGroupService } from './item-group.service';
import { ItemGroupEntity } from './item-group.entity';
import { CategoryEntity } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemGroupEntity, CategoryEntity])],
  controllers: [ItemGroupController],
  providers: [ItemGroupService],
})
export class ItemGroupModule {}
