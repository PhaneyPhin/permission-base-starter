import { VendorEntity } from './vendor.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from './dtos';

export class VendorMapper {
  public static async toDto(entity: VendorEntity): Promise<VendorResponseDto> {
    const dto = new VendorResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.contactPerson = entity.contactPerson;
    dto.phoneNumber = entity.phoneNumber;
    dto.email = entity.email;
    dto.address = entity.address;
    dto.paymentTermId = entity.paymentTermId;
    dto.paymentMethodId = entity.paymentMethodId;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateVendorRequestDto): VendorEntity {
    const entity = new VendorEntity();
    // default fields?
    entity.active = true;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phoneNumber = dto.phoneNumber;
    entity.email = dto.email;
    entity.address = dto.address;
    entity.paymentTermId = dto.paymentTermId;
    entity.paymentMethodId = dto.paymentMethodId;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorEntity,
    dto: UpdateVendorRequestDto,
  ): VendorEntity {
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phoneNumber = dto.phoneNumber;
    entity.email = dto.email;
    entity.address = dto.address;
    entity.paymentTermId = dto.paymentTermId;
    entity.paymentMethodId = dto.paymentMethodId;
    

    return entity;
  }
}
