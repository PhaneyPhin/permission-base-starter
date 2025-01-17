import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateWarehouseRequestDto,
  UpdateWarehouseRequestDto,
  WarehouseResponseDto,
} from './dtos';
import { WarehouseMapper } from './warehouse.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { WarehouseEntity } from './warehouse.entity';
import { Repository } from 'typeorm';
import { WarehouseExistsException } from './warehouse-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const WAREHOUSE_FILTER_FIELDS = ['branch', 'nameEn', 'nameKh', 'description', 'createdBy', 'contactPhone', ];
@Injectable()
export class WarehouseService extends BaseCrudService {
  protected queryName: string = 'warehouse';
  protected SEARCH_FIELDS = ['branch', 'nameEn', 'nameKh', 'description', 'createdBy', 'contactPhone', ];
  protected FILTER_FIELDS = WAREHOUSE_FILTER_FIELDS

  constructor(
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return WarehouseMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<WarehouseEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('warehouse.created_at BETWEEN :start AND :end', { start, end });
      },
      branch: (query, value) => {
        return query.andWhere('b.name_en ILIKE %branch% or b.name_kh ILIKE %branch%', { branch: value })
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.warehouseRepository.createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.createdByUser', 'uc')
      .leftJoinAndSelect('warehouse.branch', 'b')

  }

  async getAllWarehouse() {
    return (await this.warehouseRepository.createQueryBuilder('warehouse')
      .select(['id', 'name_en', 'name_kh','branch'])
      .getRawMany()).map(WarehouseMapper.toSelectDto)
  }

  /**
   * Get warehouse by id
   */
  public async getWarehouseById(id: number): Promise<WarehouseResponseDto> {
    const entity = await this.getListQuery()
      .where('warehouse.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return WarehouseMapper.toDto(entity);
  }

  /**
   * Create new warehouse
   */
  public async createWarehouse(
    dto: CreateWarehouseRequestDto,
  ): Promise<WarehouseResponseDto> {
    try {
      let entity = WarehouseMapper.toCreateEntity(dto);
      entity = await this.warehouseRepository.save(entity);
      return WarehouseMapper.toDto(entity);
    } catch (error) {
      console.log(error)
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new WarehouseExistsException(dto.branch_id + '');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update warehouse by id
   */
  public async updateWarehouse(
    id: number,
    dto: UpdateWarehouseRequestDto,
  ): Promise<WarehouseResponseDto> {
    let entity = await this.warehouseRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = WarehouseMapper.toUpdateEntity(entity, dto);
      entity = await this.warehouseRepository.save(entity);
      return WarehouseMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new WarehouseExistsException(dto.branch_id + '');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update warehouse by id
   */
  public async deleteWarehouse(
    id: number
  ): Promise<WarehouseResponseDto> {
    let entity = await this.warehouseRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.warehouseRepository.delete({ id: id });
      return WarehouseMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
