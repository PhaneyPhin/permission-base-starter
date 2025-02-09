import { UomEntity } from './uom.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateUomRequestDto,
  UpdateUomRequestDto,
  UomResponseDto,
} from './dtos';

export class UomMapper {
  public static async toDto(entity: UomEntity): Promise<UomResponseDto> {
    const dto = new UomResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateUomRequestDto): UomEntity {
    const entity = new UomEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: UomEntity,
    dto: UpdateUomRequestDto,
  ): UomEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toSelectDto(uom: UomEntity) {
    return {
      nameEn: uom.nameEn,
      nameKh: uom.nameKh,
      id: uom.id
    }
  }
}
