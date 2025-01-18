import { MasterPlanEntity } from './master-plan.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateMasterPlanRequestDto,
  UpdateMasterPlanRequestDto,
  MasterPlanResponseDto,
} from './dtos';

export class MasterPlanMapper {
  public static async toDto(entity: MasterPlanEntity): Promise<MasterPlanResponseDto> {
    const dto = new MasterPlanResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.unitCode = entity.unitCode;
    dto.project = entity.project;
    dto.block = entity.block;
    dto.building = entity.building;
    dto.street = entity.street;
    dto.unitNumber = entity.unitNumber;
    dto.division = entity.division;
    dto.unitType = entity.unitType;
    dto.landSize = entity.landSize;
    dto.unitSize = entity.unitSize;
    dto.description = entity.description;
    dto.boq = entity.boq;
    dto.startBuildDate = entity.startBuildDate;
    dto.endBuildDate = entity.endBuildDate;
    dto.actualFinishDate = entity.actualFinishDate;
    dto.completedPercentage = entity.completedPercentage;
    dto.duration = entity.duration;
    dto.standardCost = entity.standardCost;
    dto.actualCost = entity.actualCost;
    dto.unearnAccount = entity.unearnAccount;
    dto.note = entity.note;
    dto.isHandover = entity.isHandover;
    dto.createdBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateMasterPlanRequestDto): MasterPlanEntity {
    const entity = new MasterPlanEntity();
    // default fields?
    entity.active = true;
    entity.unitCode = dto.unitCode;
    entity.project = dto.project;
    entity.block = dto.block;
    entity.building = dto.building;
    entity.street = dto.street;
    entity.unitNumber = dto.unitNumber;
    entity.division = dto.division;
    entity.unitType = dto.unitType;
    entity.landSize = dto.landSize;
    entity.unitSize = dto.unitSize;
    entity.description = dto.description;
    entity.boq = dto.boq;
    entity.startBuildDate = dto.startBuildDate;
    entity.endBuildDate = dto.endBuildDate;
    entity.actualFinishDate = dto.actualFinishDate;
    entity.completedPercentage = dto.completedPercentage;
    entity.duration = dto.duration;
    entity.standardCost = dto.standardCost;
    entity.actualCost = dto.actualCost;
    entity.unearnAccount = dto.unearnAccount;
    entity.note = dto.note;
    entity.isHandover = dto.isHandover;
    entity.createdBy = dto.createdBy;
    entity.updatedBy = dto.updatedBy;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: MasterPlanEntity,
    dto: UpdateMasterPlanRequestDto,
  ): MasterPlanEntity {
    entity.unitCode = dto.unitCode;
    entity.project = dto.project;
    entity.block = dto.block;
    entity.building = dto.building;
    entity.street = dto.street;
    entity.unitNumber = dto.unitNumber;
    entity.division = dto.division;
    entity.unitType = dto.unitType;
    entity.landSize = dto.landSize;
    entity.unitSize = dto.unitSize;
    entity.description = dto.description;
    entity.boq = dto.boq;
    entity.startBuildDate = dto.startBuildDate;
    entity.endBuildDate = dto.endBuildDate;
    entity.actualFinishDate = dto.actualFinishDate;
    entity.completedPercentage = dto.completedPercentage;
    entity.duration = dto.duration;
    entity.standardCost = dto.standardCost;
    entity.actualCost = dto.actualCost;
    entity.unearnAccount = dto.unearnAccount;
    entity.note = dto.note;
    entity.isHandover = dto.isHandover;
    entity.createdBy = dto.createdBy;
    entity.updatedBy = dto.updatedBy;
    

    return entity;
  }
}
