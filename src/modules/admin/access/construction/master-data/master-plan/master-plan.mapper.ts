import { UserMapper } from "@admin/access/users/users.mapper";
import { AnalysisCodeEntity } from "../analysis-code/analysis-code.entity";
import { DimensionMapper } from "../dimension/dimension.mapper";
import {
  CreateMasterPlanRequestDto,
  MasterPlanResponseDto,
  UpdateMasterPlanRequestDto,
} from "./dtos";
import { MasterPlanEntity } from "./master-plan.entity";

export class MasterPlanMapper {
  public static async toDto(
    entity: MasterPlanEntity
  ): Promise<MasterPlanResponseDto> {
    const dto = new MasterPlanResponseDto();
    dto.id = entity.id;
    dto.active = entity.active;
    dto.unitNumber = entity.unitNumber;

    // Map related DimensionEntity fields
    const dimensionFields = [
      "project",
      "block",
      "building",
      "street",
      "division",
      "unitType",
    ];
    for (const field of dimensionFields) {
      dto[field] = entity[field]
        ? await DimensionMapper.toDto(entity[field])
        : null;
    }
    dto.unitCode = entity.unitCode;
    dto.unitNumber = entity.unitNumber;
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
    dto.status = entity.status;
    dto.attachments = entity.attachments;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    if (entity.updatedByUser) {
      dto.updatedByUser = await UserMapper.toDto(entity.updatedByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreateMasterPlanRequestDto
  ): MasterPlanEntity {
    const entity = new MasterPlanEntity();
    entity.active = true;
    entity.unitNumber = dto.unitNumber;
    entity.unitCode = dto.unitCode;
    // Assign DimensionEntity relationships
    entity.project = dto.project
      ? ({ id: dto.project } as AnalysisCodeEntity)
      : null;
    entity.block = dto.block ? ({ id: dto.block } as AnalysisCodeEntity) : null;
    entity.building = dto.building
      ? ({ id: dto.building } as AnalysisCodeEntity)
      : null;
    entity.street = dto.street
      ? ({ id: dto.street } as AnalysisCodeEntity)
      : null;
    entity.division = dto.division
      ? ({ id: dto.division } as AnalysisCodeEntity)
      : null;
    entity.unitType = dto.unitType
      ? ({ id: dto.unitType } as AnalysisCodeEntity)
      : null;

    entity.unitNumber = dto.unitNumber;
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
    entity.status = dto.status;
    entity.attachments = dto.attachments;

    return entity;
  }

  public static toUpdateEntity(
    entity: MasterPlanEntity,
    dto: UpdateMasterPlanRequestDto
  ): MasterPlanEntity {
    entity.unitNumber = dto.unitNumber;
    entity.unitCode = dto.unitCode;
    // Update DimensionEntity relationships
    entity.project = dto.project
      ? ({ id: dto.project } as AnalysisCodeEntity)
      : null;
    entity.block = dto.block ? ({ id: dto.block } as AnalysisCodeEntity) : null;
    entity.building = dto.building
      ? ({ id: dto.building } as AnalysisCodeEntity)
      : null;
    entity.street = dto.street
      ? ({ id: dto.street } as AnalysisCodeEntity)
      : null;
    entity.division = dto.division
      ? ({ id: dto.division } as AnalysisCodeEntity)
      : null;
    entity.unitType = dto.unitType
      ? ({ id: dto.unitType } as AnalysisCodeEntity)
      : null;

    entity.unitNumber = dto.unitNumber;
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
    entity.attachments = dto.attachments;

    return entity;
  }
}
