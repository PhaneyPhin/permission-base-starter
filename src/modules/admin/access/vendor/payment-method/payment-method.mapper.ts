import { PaymentMethodEntity } from './payment-method.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePaymentMethodRequestDto,
  UpdatePaymentMethodRequestDto,
  PaymentMethodResponseDto,
} from './dtos';

export class PaymentMethodMapper {
  public static async toDto(entity: PaymentMethodEntity): Promise<PaymentMethodResponseDto> {
    const dto = new PaymentMethodResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.name = entity.name;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreatePaymentMethodRequestDto): PaymentMethodEntity {
    const entity = new PaymentMethodEntity();
    // default fields?
    entity.active = true;
    entity.name = dto.name;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: PaymentMethodEntity,
    dto: UpdatePaymentMethodRequestDto,
  ): PaymentMethodEntity {
    entity.name = dto.name;
    entity.description = dto.description;
    

    return entity;
  }
}
