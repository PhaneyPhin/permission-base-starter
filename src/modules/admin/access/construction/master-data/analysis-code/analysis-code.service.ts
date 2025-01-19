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
import { AnalysisCodeExistsException } from './analysis-code-exist.exception'; // e.g., custom exception
import { AnalysisCodeEntity } from './analysis-code.entity';
import { AnalysisCodeMapper } from './analysis-code.mapper';
import {
  AnalysisCodeResponseDto,
  CreateAnalysisCodeRequestDto,
  UpdateAnalysisCodeRequestDto,
} from './dtos';

export const ANALYSIS_CODE_FILTER_FIELDS = ['dimensionId', 'code', 'nameEn', 'nameKh', ];
@Injectable()
export class AnalysisCodeService extends BaseCrudService {
  protected queryName: string = 'analysisCode';
  protected SEARCH_FIELDS = ['dimensionId', 'code', 'nameEn', 'nameKh', ];
  protected FILTER_FIELDS = ANALYSIS_CODE_FILTER_FIELDS

  constructor(
    @InjectRepository(AnalysisCodeEntity)
    private analysisCodeRepository: Repository<AnalysisCodeEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return AnalysisCodeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<AnalysisCodeEntity> } = {
      dimension: (query, value) => {
        return query.where('d.name_en ILIKE :search', {
          search: `%${value}%`
        })
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('analysisCode.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.analysisCodeRepository.createQueryBuilder('analysisCode')
      .leftJoinAndSelect('analysisCode.dimension', 'd')
      .leftJoinAndSelect('analysisCode.createdByUser', 'uc')
  }

  getAllAnalysisCode() {
    return this.analysisCodeRepository.createQueryBuilder('analysisCode').select(['id', 'name']).getRawMany()
  }

  /**
   * Get analysis-code by id
   */
  public async getAnalysisCodeById(id: number): Promise<AnalysisCodeResponseDto> {
    const entity = await this.getListQuery()
      .where('analysisCode.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return AnalysisCodeMapper.toDto(entity);
  }

  /**
   * Create new analysis-code
   */
  public async createAnalysisCode(
    dto: CreateAnalysisCodeRequestDto,
  ): Promise<AnalysisCodeResponseDto> {
    try {
      let entity = AnalysisCodeMapper.toCreateEntity(dto);
      entity = await this.analysisCodeRepository.save(entity);
      return AnalysisCodeMapper.toDto(entity);
    } catch (error) {
      console.log(error)
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new AnalysisCodeExistsException(dto.dimensionId + '');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update analysis-code by id
   */
  public async updateAnalysisCode(
    id: number,
    dto: UpdateAnalysisCodeRequestDto,
  ): Promise<AnalysisCodeResponseDto> {
    let entity = await this.analysisCodeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = AnalysisCodeMapper.toUpdateEntity(entity, dto);
      entity = await this.analysisCodeRepository.save(entity);
      return AnalysisCodeMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new AnalysisCodeExistsException(dto.dimensionId + '');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update analysis-code by id
   */
  public async deleteAnalysisCode(
    id: number
  ): Promise<AnalysisCodeResponseDto> {
    let entity = await this.analysisCodeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.analysisCodeRepository.delete({ id: id });
      return AnalysisCodeMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
