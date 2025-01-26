import { DBErrorCode } from '@common/enums';
import { BaseCrudService } from '@common/services/base-crud.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';
import { Filter, Repository } from 'typeorm';
import {
  CreateMasterPlanRequestDto,
  MasterPlanResponseDto,
  UpdateMasterPlanRequestDto,
} from './dtos';
import { MasterPlanExistsException } from './master-plan-exist.exception'; // e.g., custom exception
import { MasterPlanEntity } from './master-plan.entity';
import { MasterPlanMapper } from './master-plan.mapper';

export const MASTER_PLAN_FILTER_FIELDS = ['unitNumber', 'project', 'block', 'building', 'street', 'unitNumber', 'division', 'unitType', 'landSize', 'unitSize', 'description', 'boq', 'startBuildDate', 'endBuildDate', 'actualFinishDate', 'completedPercentage', 'duration', 'standardCost', 'actualCost', 'unearnAccount', 'note', 'isHandover', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', ];
@Injectable()
export class MasterPlanService extends BaseCrudService {
  protected queryName: string = 'masterPlan';
  protected SEARCH_FIELDS = ['unitNumber', 'project', 'block', 'building', 'street', 'unitNumber', 'division', 'unitType', 'landSize', 'unitSize', 'description', 'boq', 'startBuildDate', 'endBuildDate', 'actualFinishDate', 'completedPercentage', 'duration', 'standardCost', 'actualCost', 'unearnAccount', 'note', 'isHandover', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', ];
  protected FILTER_FIELDS = MASTER_PLAN_FILTER_FIELDS

  constructor(
    @InjectRepository(MasterPlanEntity)
    private masterPlanRepository: Repository<MasterPlanEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return MasterPlanMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<MasterPlanEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('masterPlan.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.masterPlanRepository
      .createQueryBuilder('masterPlan')
      .leftJoinAndSelect('masterPlan.createdByUser', 'uc')
      .leftJoinAndSelect('masterPlan.project', 'project')
      .leftJoinAndSelect('masterPlan.block', 'block')
      .leftJoinAndSelect('masterPlan.building', 'building')
      .leftJoinAndSelect('masterPlan.street', 'street')
      .leftJoinAndSelect('masterPlan.division', 'division')
      .leftJoinAndSelect('masterPlan.unitType', 'unitType')
  }

  getAllMasterPlan() {
    return this.masterPlanRepository.createQueryBuilder('masterPlan').select(['id', 'unit_code']).getRawMany()
  }

  /**
   * Get master-plan by id
   */
  public async getMasterPlanById(id: number): Promise<MasterPlanResponseDto> {
    const entity = await this.getListQuery()
      .where('masterPlan.id = :id', { id })
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
    dto: CreateMasterPlanRequestDto,
  ): Promise<MasterPlanResponseDto> {
    try {
      let entity = MasterPlanMapper.toCreateEntity(dto);
      entity = await this.masterPlanRepository.save(entity);
      return MasterPlanMapper.toDto(entity);
    } catch (error) {
      console.log(error)
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new MasterPlanExistsException(dto.unitNumber);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update master-plan by id
   */
  public async updateMasterPlan(
    id: number,
    dto: UpdateMasterPlanRequestDto,
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
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new MasterPlanExistsException(dto.unitNumber);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update master-plan by id
   */
  public async deleteMasterPlan(
    id: number
  ): Promise<MasterPlanResponseDto> {
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
