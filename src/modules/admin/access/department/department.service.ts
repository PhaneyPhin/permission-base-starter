import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
  DepartmentResponseDto,
} from './dtos';
import { DepartmentMapper } from './department.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { DepartmentEntity } from './department.entity';
import { Repository } from 'typeorm';
import { DepartmentExistsException } from './department-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const DEPARTMENT_FILTER_FIELDS = ['code','nameEn', 'nameKh', 'description', ];
@Injectable()
export class DepartmentService extends BaseCrudService {
  protected queryName: string = 'department';
  protected SEARCH_FIELDS = ['code','nameEn', 'nameKh', 'description', ];
  protected FILTER_FIELDS = DEPARTMENT_FILTER_FIELDS

  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return DepartmentMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<DepartmentEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('department.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.departmentRepository.createQueryBuilder('department')
      .leftJoinAndSelect('department.createdByUser', 'uc')
  }

  getAllDepartment() {
    return this.departmentRepository.createQueryBuilder('department').select(['id', 'name']).getRawMany()
  }

  /**
   * Get department by id
   */
  public async getDepartmentById(id: number): Promise<DepartmentResponseDto> {
    const entity = await this.getListQuery()
      .where('department.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return DepartmentMapper.toDto(entity);
  }

  /**
   * Create new department
   */
  public async createDepartment(
    dto: CreateDepartmentRequestDto,
  ): Promise<DepartmentResponseDto> {
    try {
      let entity = DepartmentMapper.toCreateEntity(dto);
      entity = await this.departmentRepository.save(entity);
      return DepartmentMapper.toDto(entity);
    } catch (error) {
      console.log(error)
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new DepartmentExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update department by id
   */
  public async updateDepartment(
    id: number,
    dto: UpdateDepartmentRequestDto,
  ): Promise<DepartmentResponseDto> {
    let entity = await this.departmentRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = DepartmentMapper.toUpdateEntity(entity, dto);
      entity = await this.departmentRepository.save(entity);
      return DepartmentMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new DepartmentExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update department by id
   */
  public async deleteDepartment(
    id: number
  ): Promise<DepartmentResponseDto> {
    let entity = await this.departmentRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.departmentRepository.delete({ id: id });
      return DepartmentMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
