import { Module } from '@nestjs/common';
import { ItemGroupModule } from './master-data/item-group/item-group.module';
import { UomModule } from './master-data/uom/uom.module';

@Module({
    imports: [
        ItemGroupModule,
        UomModule,
    ]
})
export class ProcumentModule {}
