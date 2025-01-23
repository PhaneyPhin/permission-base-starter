import { NationalityEntity } from './nationality.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateNationalityRequestDto,
  UpdateNationalityRequestDto,
  NationalityResponseDto,
} from './dtos';

export class NationalityMapper {
  public static async toDto(entity: NationalityEntity): Promise<NationalityResponseDto> {
    const dto = new NationalityResponseDto();
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

  public static toCreateEntity(dto: CreateNationalityRequestDto): NationalityEntity {
    const entity = new NationalityEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: NationalityEntity,
    dto: UpdateNationalityRequestDto,
  ): NationalityEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toSelectDto(nationality: NationalityEntity) {
    return {
      nameEn: nationality.nameEn,
      nameKh: nationality.nameKh,
      id: nationality.id
    }
  }
}
