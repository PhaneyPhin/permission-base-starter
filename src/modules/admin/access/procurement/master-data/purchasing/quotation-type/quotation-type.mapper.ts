import { UserMapper } from "@admin/access/users/users.mapper";
import { PurchaseOrderTypeMapper } from "../purchase-order-type/purchase-order-type.mapper";
import {
  CreateQuotationTypeRequestDto,
  QuotationTypeResponseDto,
  UpdateQuotationTypeRequestDto,
} from "./dtos";
import { QuotationTypeEntity } from "./quotation-type.entity";

export class QuotationTypeMapper {
  public static async toDto(
    entity: QuotationTypeEntity
  ): Promise<QuotationTypeResponseDto> {
    const dto = new QuotationTypeResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.defaultPOTypeId = entity.defaultPOTypeId;
    dto.codePrefix = entity.codePrefix;

    if (entity.defaultPOType) {
      dto.defaultPOType = await PurchaseOrderTypeMapper.toDto(
        entity.defaultPOType
      );
    }

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreateQuotationTypeRequestDto
  ): QuotationTypeEntity {
    const entity = new QuotationTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.defaultPOTypeId = dto.defaultPOTypeId;
    entity.codePrefix = dto.codePrefix;

    return entity;
  }

  public static toUpdateEntity(
    entity: QuotationTypeEntity,
    dto: UpdateQuotationTypeRequestDto
  ): QuotationTypeEntity {
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.defaultPOTypeId = dto.defaultPOTypeId;
    entity.codePrefix = dto.codePrefix;

    return entity;
  }
}
