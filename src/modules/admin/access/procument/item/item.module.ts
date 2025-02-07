import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemEntity } from './item.entity';
import { ItemGroupEntity } from '../master-data/item-group/item-group.entity';
import { UomEntity } from '../master-data/uom/uom.entity';
import { ValuationMethodEntity } from '../master-data/valuation-method/valuation-method.entity';
import { CategoryEntity } from '../master-data/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, ItemGroupEntity, UomEntity, ValuationMethodEntity, CategoryEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
