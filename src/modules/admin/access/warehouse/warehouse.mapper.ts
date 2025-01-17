import { WarehouseEntity } from './warehouse.entity';
import {
  CreateWarehouseRequestDto,
  UpdateWarehouseRequestDto,
  WarehouseResponseDto,
} from './dtos';
import { UserMapper } from '../users/users.mapper';
import { BranchMapper } from '../branch/branch.mapper';

export class WarehouseMapper {
  public static async toDto(entity: WarehouseEntity): Promise<WarehouseResponseDto> {
    const dto = new WarehouseResponseDto();
    dto.id = entity.id;
    dto.code = entity.code;
    dto.active = (entity as any).active; // or your default fields
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    dto.createdBy = entity.createdBy;
    dto.code = entity.code;
    dto.createdAt = entity.createdAt

    if (entity.branch) {
      dto.branch = await BranchMapper.toDto(entity.branch);
    }

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateWarehouseRequestDto): WarehouseEntity {
    const entity = new WarehouseEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.branch_id = dto.branch_id;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    entity.createdBy = dto.createdBy;
    // entity.contactPhone = dto.contactPhone;

    return entity;
  }

  public static toSelectDto(warehouse: WarehouseEntity) {
    return {
      nameEn: warehouse.nameEn,
      nameKh: warehouse.nameKh,
      branchEn: warehouse.branch.nameEn,
      branchKh: warehouse.branch?.nameKh,
      id: warehouse.id
    }
  }
  public static toUpdateEntity(
    entity: WarehouseEntity,
    dto: UpdateWarehouseRequestDto,
  ): WarehouseEntity {
    entity.branch_id = dto.branch_id;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    entity.code = dto.code;
    // entity.contactPhone = dto.contactPhone;

    return entity;
  }
}
