import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateUomRequestDto,
  UpdateUomRequestDto,
  UomResponseDto,
} from './dtos';
import { UomMapper } from './uom.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { UomEntity } from './uom.entity';
import { Repository } from 'typeorm';
import { UomExistsException } from './uom-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const UOM_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', 'description', ];
@Injectable()
export class UomService extends BaseCrudService {
  protected queryName: string = 'uom';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', 'description', ];
  protected FILTER_FIELDS = UOM_FILTER_FIELDS

  constructor(
    @InjectRepository(UomEntity)
    private uomRepository: Repository<UomEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return UomMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<UomEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('uom.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.uomRepository.createQueryBuilder('uom')
      .leftJoinAndSelect('uom.createdByUser', 'uc')
  }

  async getAllUom() {
    return (await this.getListQuery()
      .getMany()).map(UomMapper.toSelectDto)
  }

  /**
   * Get uom by id
   */
  public async getUomById(id: number): Promise<UomResponseDto> {
    const entity = await this.getListQuery()
      .where('uom.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return UomMapper.toDto(entity);
  }

  /**
   * Create new uom
   */
  public async createUom(
    dto: CreateUomRequestDto,
  ): Promise<UomResponseDto> {
    try {
      let entity = UomMapper.toCreateEntity(dto);
      entity = await this.uomRepository.save(entity);
      return UomMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new UomExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update uom by id
   */
  public async updateUom(
    id: number,
    dto: UpdateUomRequestDto,
  ): Promise<UomResponseDto> {
    let entity = await this.uomRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = UomMapper.toUpdateEntity(entity, dto);
      entity = await this.uomRepository.save(entity);
      return UomMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new UomExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update uom by id
   */
  public async deleteUom(
    id: number
  ): Promise<UomResponseDto> {
    let entity = await this.uomRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.uomRepository.delete({ id: id });
      return UomMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
