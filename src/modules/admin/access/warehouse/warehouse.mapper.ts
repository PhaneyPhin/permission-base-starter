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
    dto.name = entity.name;
    dto.description = entity.description;
    dto.active = entity.active;
    return dto;
  }

  public static toCreateEntity(dto: CreateWarehouseRequestDto): WarehouseEntity {
    const entity = new WarehouseEntity();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.active = true;
    return entity;
  }

  public static toUpdateEntity(
    entity: WarehouseEntity,
    dto: UpdateWarehouseRequestDto,
  ): WarehouseEntity {
    entity.name = dto.name;
    entity.description = dto.description;
    entity.active = dto.active;
    return entity;
  }
}
