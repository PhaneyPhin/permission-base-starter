import { QuotationTypeEntity } from './quotation-type.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateQuotationTypeRequestDto,
  UpdateQuotationTypeRequestDto,
  QuotationTypeResponseDto,
} from './dtos';

export class QuotationTypeMapper {
  public static async toDto(entity: QuotationTypeEntity): Promise<QuotationTypeResponseDto> {
    const dto = new QuotationTypeResponseDto();
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

  public static toCreateEntity(dto: CreateQuotationTypeRequestDto): QuotationTypeEntity {
    const entity = new QuotationTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: QuotationTypeEntity,
    dto: UpdateQuotationTypeRequestDto,
  ): QuotationTypeEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
