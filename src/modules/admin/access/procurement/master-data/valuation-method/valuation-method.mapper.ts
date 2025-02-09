import { ValuationMethodEntity } from './valuation-method.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateValuationMethodRequestDto,
  UpdateValuationMethodRequestDto,
  ValuationMethodResponseDto,
} from './dtos';

export class ValuationMethodMapper {
  public static async toDto(entity: ValuationMethodEntity): Promise<ValuationMethodResponseDto> {
    const dto = new ValuationMethodResponseDto();
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

  public static toCreateEntity(dto: CreateValuationMethodRequestDto): ValuationMethodEntity {
    const entity = new ValuationMethodEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: ValuationMethodEntity,
    dto: UpdateValuationMethodRequestDto,
  ): ValuationMethodEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
