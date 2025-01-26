import { VendorTypeEntity } from './vendor-type.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateVendorTypeRequestDto,
  UpdateVendorTypeRequestDto,
  VendorTypeResponseDto,
} from './dtos';

export class VendorTypeMapper {
  public static async toDto(entity: VendorTypeEntity): Promise<VendorTypeResponseDto> {
    const dto = new VendorTypeResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateVendorTypeRequestDto): VendorTypeEntity {
    const entity = new VendorTypeEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorTypeEntity,
    dto: UpdateVendorTypeRequestDto,
  ): VendorTypeEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }
}
