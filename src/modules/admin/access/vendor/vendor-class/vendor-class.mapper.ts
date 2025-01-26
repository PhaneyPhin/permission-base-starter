import { VendorClassEntity } from './vendor-class.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateVendorClassRequestDto,
  UpdateVendorClassRequestDto,
  VendorClassResponseDto,
} from './dtos';

export class VendorClassMapper {
  public static async toDto(entity: VendorClassEntity): Promise<VendorClassResponseDto> {
    const dto = new VendorClassResponseDto();
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

  public static toCreateEntity(dto: CreateVendorClassRequestDto): VendorClassEntity {
    const entity = new VendorClassEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorClassEntity,
    dto: UpdateVendorClassRequestDto,
  ): VendorClassEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }
}
