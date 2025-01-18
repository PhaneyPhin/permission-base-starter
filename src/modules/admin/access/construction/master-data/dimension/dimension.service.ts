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
import { DimensionExistsException } from './dimension-exist.exception'; // e.g., custom exception
import { DimensionEntity } from './dimension.entity';
import { DimensionMapper } from './dimension.mapper';
import {
  CreateDimensionRequestDto,
  DimensionResponseDto,
  UpdateDimensionRequestDto,
} from './dtos';

export const DIMENSION_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', ];
@Injectable()
export class DimensionService extends BaseCrudService {
  protected queryName: string = 'dimension';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', ];
  protected FILTER_FIELDS = DIMENSION_FILTER_FIELDS

  constructor(
    @InjectRepository(DimensionEntity)
    private dimensionRepository: Repository<DimensionEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return DimensionMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<DimensionEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('dimension.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.dimensionRepository.createQueryBuilder('dimension')
      .leftJoinAndSelect('dimension.createdByUser', 'uc')
  }

  getAllDimension() {
    return this.dimensionRepository.createQueryBuilder('dimension').getMany()
  }

  /**
   * Get dimension by id
   */
  public async getDimensionById(id: number): Promise<DimensionResponseDto> {
    const entity = await this.getListQuery()
      .where('dimension.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return DimensionMapper.toDto(entity);
  }

  /**
   * Create new dimension
   */
  public async createDimension(
    dto: CreateDimensionRequestDto,
  ): Promise<DimensionResponseDto> {
    try {
      let entity = DimensionMapper.toCreateEntity(dto);
      entity = await this.dimensionRepository.save(entity);
      return DimensionMapper.toDto(entity);
    } catch (error) {
      console.log(error)
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new DimensionExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update dimension by id
   */
  public async updateDimension(
    id: number,
    dto: UpdateDimensionRequestDto,
  ): Promise<DimensionResponseDto> {
    let entity = await this.dimensionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = DimensionMapper.toUpdateEntity(entity, dto);
      entity = await this.dimensionRepository.save(entity);
      return DimensionMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new DimensionExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update dimension by id
   */
  public async deleteDimension(
    id: number
  ): Promise<DimensionResponseDto> {
    let entity = await this.dimensionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.dimensionRepository.delete({ id: id });
      return DimensionMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
