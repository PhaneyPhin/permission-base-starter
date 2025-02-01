import { UserMapper } from "@admin/access/users/users.mapper";
import {
  CreatePaymentTermRequestDto,
  PaymentTermResponseDto,
  UpdatePaymentTermRequestDto,
} from "./dtos";
import { PaymentTermEntity } from "./payment-term.entity";

export class PaymentTermMapper {
  public static async toDto(
    entity: PaymentTermEntity
  ): Promise<PaymentTermResponseDto> {
    const dto = new PaymentTermResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.name = entity.name;
    dto.daysDue = entity.daysDue;
    dto.code = entity.code;
    dto.description = entity.description;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreatePaymentTermRequestDto
  ): PaymentTermEntity {
    const entity = new PaymentTermEntity();
    // default fields?
    entity.active = true;
    entity.name = dto.name;
    entity.daysDue = dto.daysDue;
    entity.description = dto.description;
    entity.code = dto.code;

    return entity;
  }

  public static toUpdateEntity(
    entity: PaymentTermEntity,
    dto: UpdatePaymentTermRequestDto
  ): PaymentTermEntity {
    entity.name = dto.name;
    entity.daysDue = dto.daysDue;
    entity.description = dto.description;
    entity.code = dto.code;

    return entity;
  }
}
