import { CategoryEntity } from './category.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
  CategoryResponseDto,
} from './dtos';

export class CategoryMapper {
  public static async toDto(entity: CategoryEntity): Promise<CategoryResponseDto> {
    const dto = new CategoryResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    entity.parentId = dto.parentId === 0 ? null : dto.parentId;
    dto.description = entity.description;
    
    if (entity.parent) {
      dto.parent = {
        id: entity.parent.id,
        code: entity.parent.code,
        nameEn: entity.parent.nameEn,
        nameKh: entity.parent.nameKh,
        description: entity.parent.description,
      };
    }

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateCategoryRequestDto): CategoryEntity {
    const entity = new CategoryEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.parentId = dto.parentId === 0 ? null : dto.parentId;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: CategoryEntity,
    dto: UpdateCategoryRequestDto,
  ): CategoryEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.parentId = dto.parentId === 0 ? null : dto.parentId;
    entity.description = dto.description;
    

    return entity;
  }
}
