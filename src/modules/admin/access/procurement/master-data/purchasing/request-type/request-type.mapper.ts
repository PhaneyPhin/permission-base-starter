import { UserMapper } from "@admin/access/users/users.mapper";
import { QuotationTypeMapper } from "../quotation-type/quotation-type.mapper";
import {
  CreateRequestTypeRequestDto,
  RequestTypeResponseDto,
  UpdateRequestTypeRequestDto,
} from "./dtos";
import { RequestTypeEntity } from "./request-type.entity";

export class RequestTypeMapper {
  public static async toDto(
    entity: RequestTypeEntity
  ): Promise<RequestTypeResponseDto> {
    const dto = new RequestTypeResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.numberRank = entity.numberRank;
    dto.approvalFlow = entity.approvalFlow;
    dto.isRequireApproval = entity.isRequireApproval;
    dto.defaultQuotationId = entity.defaultQuotationId;
    if (entity.defaultQuotation) {
      dto.defaultQuotation = await QuotationTypeMapper.toDto(
        entity.defaultQuotation
      );
    }

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreateRequestTypeRequestDto
  ): RequestTypeEntity {
    const entity = new RequestTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.numberRank = dto.numberRank;
    entity.approvalFlow = dto.approvalFlow;
    entity.codePrefix = entity.codePrefix;
    dto.codePrefix = entity.codePrefix;
    entity.defaultQuotationId = dto.defaultQuotationId;
    entity.isRequireApproval = dto.isRequireApproval;

    return entity;
  }

  public static toUpdateEntity(
    entity: RequestTypeEntity,
    dto: UpdateRequestTypeRequestDto
  ): RequestTypeEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.numberRank = dto.numberRank;
    entity.approvalFlow = dto.approvalFlow;
    entity.codePrefix = dto.codePrefix;
    entity.defaultQuotationId = dto.defaultQuotationId;
    entity.isRequireApproval = dto.isRequireApproval;

    return entity;
  }
}
