import { UserMapper } from "@admin/access/users/users.mapper";
import {
  CreatePaymentMethodRequestDto,
  PaymentMethodResponseDto,
  UpdatePaymentMethodRequestDto,
} from "./dtos";
import { PaymentMethodEntity } from "./payment-method.entity";

export class PaymentMethodMapper {
  public static async toDto(
    entity: PaymentMethodEntity
  ): Promise<PaymentMethodResponseDto> {
    const dto = new PaymentMethodResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.name = entity.name;
    dto.code = entity.code;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreatePaymentMethodRequestDto
  ): PaymentMethodEntity {
    const entity = new PaymentMethodEntity();
    // default fields?
    entity.active = true;
    entity.name = dto.name;
    entity.code = dto.code;

    return entity;
  }

  public static toUpdateEntity(
    entity: PaymentMethodEntity,
    dto: UpdatePaymentMethodRequestDto
  ): PaymentMethodEntity {
    entity.name = dto.name;
    entity.code = dto.code;

    return entity;
  }
}
