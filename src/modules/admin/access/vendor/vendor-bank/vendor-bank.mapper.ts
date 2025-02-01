import { VendorBankEntity } from './vendor-bank.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateVendorBankRequestDto,
  UpdateVendorBankRequestDto,
  VendorBankResponseDto,
} from './dtos';

export class VendorBankMapper {
  public static async toDto(entity: VendorBankEntity): Promise<VendorBankResponseDto> {
    const dto = new VendorBankResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.vendorId = entity.vendorId;
    dto.bankId = entity.bankId;
    dto.accountNumber = entity.accountNumber;
    dto.accountHolderName = entity.accountHolderName;
    dto.currency = entity.currency;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateVendorBankRequestDto): VendorBankEntity {
    const entity = new VendorBankEntity();
    // default fields?
    entity.active = true;
    entity.vendorId = dto.vendorId;
    entity.bankId = dto.bankId;
    entity.accountNumber = dto.accountNumber;
    entity.accountHolderName = dto.accountHolderName;
    entity.currency = dto.currency;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorBankEntity,
    dto: UpdateVendorBankRequestDto,
  ): VendorBankEntity {
    entity.vendorId = dto.vendorId;
    entity.bankId = dto.bankId;
    entity.accountNumber = dto.accountNumber;
    entity.accountHolderName = dto.accountHolderName;
    entity.currency = dto.currency;
    

    return entity;
  }
}
