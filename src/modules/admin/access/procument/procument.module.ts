import { Module } from '@nestjs/common';
import { ItemGroupModule } from './master-data/item-group/item-group.module';
import { UomModule } from './master-data/uom/uom.module';
import { CategoryModule } from './master-data/category/category.module';
import { ItemModule } from './item/item.module';

@Module({
    imports: [
        ItemGroupModule,
        UomModule,
        CategoryModule,
        ItemModule,
    ]
})
export class ProcumentModule {}
