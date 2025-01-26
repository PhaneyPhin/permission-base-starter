import { ItemEntity } from './item.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateItemRequestDto,
  UpdateItemRequestDto,
  ItemResponseDto,
} from './dtos';
import { CategoryMapper } from '../category/category.mapper';
import { UomMapper } from '../uom/uom.mapper';

export class ItemMapper {
  public static async toDto(entity: ItemEntity): Promise<ItemResponseDto> {
    const dto = new ItemResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    
    if (entity.category) {
      dto.category = await CategoryMapper.toDto(entity.category);
    }
    if (entity.uom) {
      dto.uom = await UomMapper.toDto(entity.uom);
    }
     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateItemRequestDto): ItemEntity {
    const entity = new ItemEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.categoryId = dto.categoryId;
    entity.uomId = dto.uomId;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: ItemEntity,
    dto: UpdateItemRequestDto,
  ): ItemEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.categoryId = dto.categoryId;
    entity.uomId = dto.uomId;
    entity.description = dto.description;
    

    return entity;
  }

  public static toSelectDto(item: ItemEntity) {
    return {
      nameEn: item.nameEn,
      nameKh: item.nameKh,
      id: item.id
    }
  }
}
