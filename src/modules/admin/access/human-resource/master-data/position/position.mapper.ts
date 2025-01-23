import { PositionEntity } from './position.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePositionRequestDto,
  UpdatePositionRequestDto,
  PositionResponseDto,
} from './dtos';

export class PositionMapper {
  public static async toDto(entity: PositionEntity): Promise<PositionResponseDto> {
    const dto = new PositionResponseDto();
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

  public static toCreateEntity(dto: CreatePositionRequestDto): PositionEntity {
    const entity = new PositionEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toSelectDto(position: PositionEntity) {
    return {
      nameEn: position.nameEn,
      nameKh: position.nameKh,
      id: position.id
    }
  }

  public static toUpdateEntity(
    entity: PositionEntity,
    dto: UpdatePositionRequestDto,
  ): PositionEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
