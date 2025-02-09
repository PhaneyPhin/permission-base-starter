import { UserMapper } from "@admin/access/users/users.mapper";
import { VendorBank } from "../vendor/dtos/vendor-bank.dto";
import { VendorEntity } from "../vendor/vendor.entity";
import {
  CreateVendorBankRequestDto,
  UpdateVendorBankRequestDto,
  VendorBankResponseDto,
} from "./dtos";
import { VendorBankEntity } from "./vendor-bank.entity";

export class VendorBankMapper {
  public static async toDto(
    entity: VendorBankEntity
  ): Promise<VendorBankResponseDto> {
    const dto = new VendorBankResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.vendorId = entity.vendor?.id;
    dto.bankId = entity.bankId;
    dto.accountNumber = entity.accountNumber;
    dto.benifitsaryName = entity.benifitsaryName;
    dto.currency = entity.currency;
    dto.countryCode = entity.countryCode;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreateVendorBankRequestDto | VendorBank
  ): VendorBankEntity {
    const entity = new VendorBankEntity();
    // default fields?
    entity.active = true;
    entity.bankId = dto.bankId;
    entity.accountNumber = dto.accountNumber;
    entity.benifitsaryName = dto.benifitsaryName;
    entity.currency = dto.currency;
    entity.countryCode = dto.countryCode;

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorBankEntity,
    dto: UpdateVendorBankRequestDto | VendorBank
  ): VendorBankEntity {
    entity.vendor = new VendorEntity();
    entity.id = dto.id || undefined;
    entity.bankId = dto.bankId;
    entity.accountNumber = dto.accountNumber;
    entity.benifitsaryName = dto.benifitsaryName;
    entity.currency = dto.currency;
    entity.countryCode = dto.countryCode;

    return entity;
  }
}
