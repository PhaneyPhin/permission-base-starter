import { PurchaseReceiptTypeEntity } from './purchase-receipt-type.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseReceiptTypeRequestDto,
  UpdatePurchaseReceiptTypeRequestDto,
  PurchaseReceiptTypeResponseDto,
} from './dtos';

export class PurchaseReceiptTypeMapper {
  public static async toDto(entity: PurchaseReceiptTypeEntity): Promise<PurchaseReceiptTypeResponseDto> {
    const dto = new PurchaseReceiptTypeResponseDto();
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

  public static toCreateEntity(dto: CreatePurchaseReceiptTypeRequestDto): PurchaseReceiptTypeEntity {
    const entity = new PurchaseReceiptTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseReceiptTypeEntity,
    dto: UpdatePurchaseReceiptTypeRequestDto,
  ): PurchaseReceiptTypeEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }
}
