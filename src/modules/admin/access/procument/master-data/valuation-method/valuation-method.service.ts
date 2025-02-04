import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateValuationMethodRequestDto,
  UpdateValuationMethodRequestDto,
  ValuationMethodResponseDto,
} from './dtos';
import { ValuationMethodMapper } from './valuation-method.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { ValuationMethodEntity } from './valuation-method.entity';
import { Repository } from 'typeorm';
import { ValuationMethodExistsException } from './valuation-method-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const VALUATION_METHOD_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', ];
@Injectable()
export class ValuationMethodService extends BaseCrudService {
  protected queryName: string = 'valuationMethod';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', ];
  protected FILTER_FIELDS = VALUATION_METHOD_FILTER_FIELDS

  constructor(
    @InjectRepository(ValuationMethodEntity)
    private valuationMethodRepository: Repository<ValuationMethodEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return ValuationMethodMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<ValuationMethodEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('valuationMethod.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.valuationMethodRepository.createQueryBuilder('valuationMethod')
      .leftJoinAndSelect('valuationMethod.createdByUser', 'uc')
  }

  getAllValuationMethod() {
    return this.valuationMethodRepository.createQueryBuilder('valuationMethod').select(['id', 'name']).getRawMany()
  }

  /**
   * Get valuation-method by id
   */
  public async getValuationMethodById(id: number): Promise<ValuationMethodResponseDto> {
    const entity = await this.getListQuery()
      .where('valuationMethod.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return ValuationMethodMapper.toDto(entity);
  }

  /**
   * Create new valuation-method
   */
  public async createValuationMethod(
    dto: CreateValuationMethodRequestDto,
  ): Promise<ValuationMethodResponseDto> {
    try {
      let entity = ValuationMethodMapper.toCreateEntity(dto);
      entity = await this.valuationMethodRepository.save(entity);
      return ValuationMethodMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ValuationMethodExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update valuation-method by id
   */
  public async updateValuationMethod(
    id: number,
    dto: UpdateValuationMethodRequestDto,
  ): Promise<ValuationMethodResponseDto> {
    let entity = await this.valuationMethodRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = ValuationMethodMapper.toUpdateEntity(entity, dto);
      entity = await this.valuationMethodRepository.save(entity);
      return ValuationMethodMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ValuationMethodExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update valuation-method by id
   */
  public async deleteValuationMethod(
    id: number
  ): Promise<ValuationMethodResponseDto> {
    let entity = await this.valuationMethodRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.valuationMethodRepository.delete({ id: id });
      return ValuationMethodMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
