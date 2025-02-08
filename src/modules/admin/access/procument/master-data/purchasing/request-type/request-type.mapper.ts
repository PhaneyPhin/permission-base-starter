import { UserMapper } from "@admin/access/users/users.mapper";
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
    dto.name = entity.name;
    dto.numberRank = entity.numberRank;
    dto.approvalFlow = entity.approvalFlow;
    dto.defaultQuotation = entity.defaultQuotation;
    dto.isRequireApproval = entity.isRequireApproval;

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
    entity.name = dto.name;
    entity.numberRank = dto.numberRank;
    entity.approvalFlow = dto.approvalFlow;
    entity.defaultQuotation = dto.defaultQuotation;
    entity.isRequireApproval = dto.isRequireApproval;

    return entity;
  }

  public static toUpdateEntity(
    entity: RequestTypeEntity,
    dto: UpdateRequestTypeRequestDto
  ): RequestTypeEntity {
    entity.code = dto.code;
    entity.name = dto.name;
    entity.numberRank = dto.numberRank;
    entity.approvalFlow = dto.approvalFlow;
    entity.defaultQuotation = dto.defaultQuotation;
    entity.isRequireApproval = dto.isRequireApproval;

    return entity;
  }
}
