import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemEntity } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
