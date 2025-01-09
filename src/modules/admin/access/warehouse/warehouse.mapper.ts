import { WarehouseEntity } from './warehouse.entity';
import {
  CreateWarehouseRequestDto,
  UpdateWarehouseRequestDto,
  WarehouseResponseDto,
} from './dtos';
import { UserMapper } from '../users/users.mapper';

export class WarehouseMapper {
  public static async toDto(entity: WarehouseEntity): Promise<WarehouseResponseDto> {
    const dto = new WarehouseResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.branch = entity.branch;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    dto.createdBy = entity.createdBy;
    dto.contactPhone = entity.contactPhone;  
    dto.createdAt = entity.createdAt
    
    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateWarehouseRequestDto): WarehouseEntity {
    const entity = new WarehouseEntity();
    // default fields?
    entity.active = true;
    entity.branch = dto.branch;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    entity.createdBy = dto.createdBy;
    entity.contactPhone = dto.contactPhone;

    return entity;
  }

  public static toSelectDto(warehouse: any) {
    console.log({nameEn: warehouse.name_en,
      nameKh: warehouse.name_kh,
      branch: warehouse.branch,
      id: warehouse.id})
    return {
      nameEn: warehouse.name_en,
      nameKh: warehouse.name_kh,
      branch: warehouse.branch,
      id: warehouse.id
    }
  }
  public static toUpdateEntity(
    entity: WarehouseEntity,
    dto: UpdateWarehouseRequestDto,
  ): WarehouseEntity {
    entity.branch = dto.branch;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    entity.contactPhone = dto.contactPhone;
    
    return entity;
  }
}
