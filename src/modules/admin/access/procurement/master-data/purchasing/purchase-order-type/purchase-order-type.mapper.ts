import { PurchaseOrderTypeEntity } from './purchase-order-type.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseOrderTypeRequestDto,
  UpdatePurchaseOrderTypeRequestDto,
  PurchaseOrderTypeResponseDto,
} from './dtos';

export class PurchaseOrderTypeMapper {
  public static async toDto(entity: PurchaseOrderTypeEntity): Promise<PurchaseOrderTypeResponseDto> {
    const dto = new PurchaseOrderTypeResponseDto();
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

  public static toCreateEntity(dto: CreatePurchaseOrderTypeRequestDto): PurchaseOrderTypeEntity {
    const entity = new PurchaseOrderTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseOrderTypeEntity,
    dto: UpdatePurchaseOrderTypeRequestDto,
  ): PurchaseOrderTypeEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
