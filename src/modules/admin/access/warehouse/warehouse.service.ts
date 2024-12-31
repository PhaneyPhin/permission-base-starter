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

@Injectable()
export class WarehouseService extends BaseCrudService {
  protected queryName: string = 'warehouse';
  protected FILTER_FIELDS = ['createdAt'];
  protected SEARCH_FIELDS = ['username', 'name', 'email'];

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
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.warehouseRepository.createQueryBuilder('warehouse')
  }

  getAllWarehouse() {
    return this.warehouseRepository.createQueryBuilder('warehouse').select(['id', 'name']).getRawMany()
  }

  /**
   * Get warehouse by id
   */
  public async getWarehouseById(id: number): Promise<WarehouseResponseDto> {
    const entity = await this.warehouseRepository.findOneBy({ id });
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
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new WarehouseExistsException(dto.name);
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
        throw new WarehouseExistsException(dto.name);
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
