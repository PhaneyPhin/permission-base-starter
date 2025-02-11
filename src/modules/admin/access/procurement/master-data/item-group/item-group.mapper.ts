import { ItemGroupEntity } from './item-group.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateItemGroupRequestDto,
  UpdateItemGroupRequestDto,
  ItemGroupResponseDto,
} from './dtos';

export class ItemGroupMapper {
  public static async toDto(entity: ItemGroupEntity): Promise<ItemGroupResponseDto> {
    const dto = new ItemGroupResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.isStockItem = entity.isStockItem;
    dto.isNonStockItem = entity.isNonStockItem;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateItemGroupRequestDto): ItemGroupEntity {
    const entity = new ItemGroupEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.isStockItem = dto.isStockItem;
    entity.isNonStockItem = dto.isNonStockItem;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: ItemGroupEntity,
    dto: UpdateItemGroupRequestDto,
  ): ItemGroupEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.isStockItem = dto.isStockItem;
    entity.isNonStockItem = dto.isNonStockItem;
    entity.description = dto.description;
    

    return entity;
  }

  public static toSelectDto(itemGroup: ItemGroupEntity) {
    return {
      nameEn: itemGroup.nameEn,
      nameKh: itemGroup.nameKh,
      id: itemGroup.id
    }
  }
}
