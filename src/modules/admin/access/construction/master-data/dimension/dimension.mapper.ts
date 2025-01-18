import { UserMapper } from '@admin/access/users/users.mapper';
import { DimensionEntity } from './dimension.entity';
import {
  CreateDimensionRequestDto,
  DimensionResponseDto,
  UpdateDimensionRequestDto,
} from './dtos';

export class DimensionMapper {
  public static async toDto(entity: DimensionEntity): Promise<DimensionResponseDto> {
    const dto = new DimensionResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateDimensionRequestDto): DimensionEntity {
    const entity = new DimensionEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: DimensionEntity,
    dto: UpdateDimensionRequestDto,
  ): DimensionEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
