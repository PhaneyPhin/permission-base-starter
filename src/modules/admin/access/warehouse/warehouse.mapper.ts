import { WarehouseEntity } from './warehouse.entity';
import {
  CreateWarehouseRequestDto,
  UpdateWarehouseRequestDto,
  WarehouseResponseDto,
} from './dtos';

export class WarehouseMapper {
  public static toDto(entity: WarehouseEntity): WarehouseResponseDto {
    const dto = new WarehouseResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.branch = entity.branch;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    dto.createdBy = entity.createdBy;
    dto.contactPhone = entity.contactPhone;
    

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

  public static toUpdateEntity(
    entity: WarehouseEntity,
    dto: UpdateWarehouseRequestDto,
  ): WarehouseEntity {
    entity.branch = dto.branch;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    entity.createdBy = dto.createdBy;
    entity.contactPhone = dto.contactPhone;
    

    return entity;
  }
}
