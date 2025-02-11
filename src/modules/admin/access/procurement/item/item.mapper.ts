import { ItemEntity } from './item.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateItemRequestDto,
  UpdateItemRequestDto,
  ItemResponseDto,
} from './dtos';
import { CategoryMapper } from '../master-data/category/category.mapper';
import { UomMapper } from '../master-data/uom/uom.mapper';
import { ItemGroupMapper } from '../master-data/item-group/item-group.mapper';
import { ValuationMethodMapper } from '../master-data/valuation-method/valuation-method.mapper';
import { ModuleStatus } from '@common/enums/status.enum';

export class ItemMapper {
  public static async toDto(entity: ItemEntity): Promise<ItemResponseDto> {
    const dto = new ItemResponseDto();
    dto.id = entity.id;
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.itemType = entity.itemType;
    dto.minStock = entity.minStock;
    dto.standardCost = entity.standardCost;
    dto.unitCost = entity.unitCost;
    dto.status = entity.status;
    dto.itemImage = entity.itemImage;
    dto.itemImageUrl = entity.itemImage ? await entity.getItemImageUrl() : null;
    dto.note = entity.note;
    
    if (entity.category) {
      dto.category = await CategoryMapper.toDto(entity.category);
    }
    if (entity.uom) {
      dto.uom = await UomMapper.toDto(entity.uom);
    }
    if (entity.itemGroup) {
      dto.itemGroup = await ItemGroupMapper.toDto(entity.itemGroup);
    }
    if (entity.valuationMethod) {
      dto.valuationMethod = await ValuationMethodMapper.toDto(entity.valuationMethod);
    }    
    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateItemRequestDto): ItemEntity {
    const entity = new ItemEntity();
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.itemGroupId = dto.itemGroupId;
    entity.categoryId = dto.categoryId;
    entity.uomId = dto.uomId;
    entity.itemType = dto.itemType;
    entity.valuationMethodId = dto.valuationMethodId;
    entity.minStock = dto.minStock;
    entity.standardCost = dto.standardCost;
    entity.unitCost = dto.unitCost;
    entity.itemImage = dto.itemImage;
    entity.status = dto.status;
    entity.note = dto.note;
    entity.createdBy = dto.createdBy;

    return entity;
  }

  public static toUpdateEntity(
    entity: ItemEntity,
    dto: UpdateItemRequestDto,
  ): ItemEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.itemGroupId = dto.itemGroupId;
    entity.categoryId = dto.categoryId;
    entity.uomId = dto.uomId;
    entity.valuationMethodId = dto.valuationMethodId;
    entity.itemType = dto.itemType;
    entity.minStock = dto.minStock;
    entity.standardCost = dto.standardCost;
    entity.unitCost = dto.unitCost;
    entity.itemImage = dto.itemImage;
    entity.status = dto.status;
    entity.note = dto.note;
    entity.updatedBy = dto.updatedBy;


    return entity;
  }

  public static toSelectDto(item: ItemEntity) {
    return {
      nameEn: item.nameEn,
      nameKh: item.nameKh,
      id: item.id
    }
  }

  public static toBulkUpdateResponse(
      updatedIds: number[],
      status: ModuleStatus,
    ): { message: string; updatedIds: number[]; status: ModuleStatus } {
      return {
        message: `Successfully updated the status for ${updatedIds.length} items to '${status}'.`,
        updatedIds,
        status,
      };
    }
}
