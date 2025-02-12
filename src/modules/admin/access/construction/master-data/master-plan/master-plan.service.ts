import { BaseCrudService } from "@common/services/base-crud.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleError } from "@utils/handle-error";
import { TimeoutError } from "rxjs";
import { Filter, Repository } from "typeorm";
import {
  CreateMasterPlanRequestDto,
  MasterPlanResponseDto,
  UpdateMasterPlanRequestDto,
} from "./dtos";
import { MasterPlanEntity } from "./master-plan.entity";
import { MasterPlanMapper } from "./master-plan.mapper";

export const MASTER_PLAN_FILTER_FIELDS = [
  "unitNumber",
  "project",
  "block",
  "building",
  "street",
  "unitNumber",
  "division",
  "unitType",
  "landSize",
  "unitSize",
  "description",
  "boq",
  "startBuildDate",
  "endBuildDate",
  "actualFinishDate",
  "completedPercentage",
  "duration",
  "standardCost",
  "actualCost",
  "unearnAccount",
  "note",
  "isHandover",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
];
@Injectable()
export class MasterPlanService extends BaseCrudService {
  protected queryName: string = "masterPlan";
  protected SEARCH_FIELDS = [
    "unitNumber",
    "project",
    "block",
    "building",
    "street",
    "unitNumber",
    "division",
    "unitType",
    "landSize",
    "unitSize",
    "description",
    "boq",
    "startBuildDate",
    "endBuildDate",
    "actualFinishDate",
    "completedPercentage",
    "duration",
    "standardCost",
    "actualCost",
    "unearnAccount",
    "note",
    "isHandover",
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
  ];
  protected FILTER_FIELDS = MASTER_PLAN_FILTER_FIELDS;

  constructor(
    @InjectRepository(MasterPlanEntity)
    private masterPlanRepository: Repository<MasterPlanEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return MasterPlanMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<MasterPlanEntity> } = {
      project: (query, value) => {
        return query.andWhere(
          "project.name_en ILIKE :value or .name_kh ILIKE :value",
          { value }
        );
      },
      block: (query, value) => {
        return query.andWhere(
          "block.name_en ILIKE :value or block.name_kh ILIKE :value",
          { value }
        );
      },
      building: (query, value) => {
        return query.andWhere(
          "building.name_en ILIKE :value or building.name_kh ILIKE :value",
          { value }
        );
      },
      street: (query, value) => {
        return query.andWhere(
          "street.name_en ILIKE :value or street.name_kh ILIKE :value",
          { value }
        );
      },
      division: (query, value) => {
        return query.andWhere(
          "division.name_en ILIKE :value or division.name_kh ILIKE :value",
          { value }
        );
      },
      unitType: (query, value) => {
        return query.andWhere(
          "unitType.name_en ILIKE :value or unitType.name_kh ILIKE :value",
          { value }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("masterPlan.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.masterPlanRepository
      .createQueryBuilder("masterPlan")
      .leftJoinAndSelect("masterPlan.createdByUser", "uc")
      .leftJoinAndSelect("masterPlan.updatedByUser", "uu")
      .leftJoinAndSelect("masterPlan.project", "project")
      .leftJoinAndSelect("masterPlan.block", "block")
      .leftJoinAndSelect("masterPlan.building", "building")
      .leftJoinAndSelect("masterPlan.street", "street")
      .leftJoinAndSelect("masterPlan.division", "division")
      .leftJoinAndSelect("masterPlan.unitType", "unitType");
  }

  getAllMasterPlan() {
    return this.masterPlanRepository
      .createQueryBuilder("masterPlan")
      .select(["id", "unit_code"])
      .getRawMany();
  }

  /**
   * Get master-plan by id
   */
  public async getMasterPlanById(id: number): Promise<MasterPlanResponseDto> {
    const entity = await this.getListQuery()
      .where("masterPlan.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return MasterPlanMapper.toDto(entity);
  }

  /**
   * Create new master-plan
   */
  public async createMasterPlan(
    dto: CreateMasterPlanRequestDto
  ): Promise<MasterPlanResponseDto> {
    try {
      let entity = MasterPlanMapper.toCreateEntity(dto);
      entity = await this.masterPlanRepository.save(entity);
      return MasterPlanMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update master-plan by id
   */
  public async updateMasterPlan(
    id: number,
    dto: UpdateMasterPlanRequestDto
  ): Promise<MasterPlanResponseDto> {
    let entity = await this.masterPlanRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = MasterPlanMapper.toUpdateEntity(entity, dto);
      entity = await this.masterPlanRepository.save(entity);
      return MasterPlanMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update master-plan by id
   */
  public async deleteMasterPlan(id: number): Promise<MasterPlanResponseDto> {
    let entity = await this.masterPlanRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.masterPlanRepository.delete({ id: id });
      return MasterPlanMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
