import { ItemEntity } from '@modules/admin/access/procurement/item/item.entity';
import { ModuleStatus } from '@common/enums/status.enum';
import { ItemType } from '@modules/admin/access/procurement/item/item-type-enum';

export const itemSeed: Partial<ItemEntity>[] = [
    { id: 1, code: "I001", nameEn: "Laptop", nameKh: "កុំព្យូទ័រ", itemGroupId: 1, categoryId: 1, uomId: 1, valuationMethodId: 1, itemType: ItemType.INVENTORY, minStock: 10, standardCost: 500, unitCost: 550, note: "High performance laptop", status: ModuleStatus.ACTIVE },
    { id: 2, code: "I002", nameEn: "Office Chair", nameKh: "កៅអីការិយាល័យ", itemGroupId: 2, categoryId: 2, uomId: 2, valuationMethodId: 1, itemType: ItemType.INVENTORY, minStock: 15, standardCost: 30, unitCost: 35, note: "Ergonomic office chair", status: ModuleStatus.ACTIVE },
    { id: 3, code: "I003", nameEn: "Smartphone", nameKh: "ទូរស័ព្ទដៃ", itemGroupId: 1, categoryId: 1, uomId: 1, valuationMethodId: 1, itemType: ItemType.INVENTORY, minStock: 20, standardCost: 300, unitCost: 350, note: "Latest mobile device", status: ModuleStatus.ACTIVE },
    { id: 4, code: "I004", nameEn: "Table", nameKh: "តុ", itemGroupId: 2, categoryId: 2, uomId: 2, valuationMethodId: 1, itemType: ItemType.INVENTORY, minStock: 5, standardCost: 100, unitCost: 120, note: "Wooden dining table", status: ModuleStatus.ACTIVE },
    { id: 5, code: "I005", nameEn: "Refrigerator", nameKh: "ទូរទឹកកក", itemGroupId: 2, categoryId: 2, uomId: 2, valuationMethodId: 1, itemType: ItemType.INVENTORY, minStock: 8, standardCost: 200, unitCost: 250, note: "Energy efficient refrigerator", status: ModuleStatus.ACTIVE }
];