import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
  EmployeeResponseDto,
} from './dtos';
import { EmployeeMapper } from './employee.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { EmployeeExistsException } from './employee-exist.exception';
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const EMPLOYEE_FILTER_FIELDS = ['employeeCode', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'contactNumber', 'emailAddress', 'departmentId', 'positionId', 'hireDate', 'remark', ];
@Injectable()
export class EmployeeService extends BaseCrudService {
  protected queryName: string = 'employee';
  protected SEARCH_FIELDS = ['employeeCode', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'contactNumber', 'emailAddress', 'departmentId', 'positionId', 'hireDate', 'remark', ];
  protected FILTER_FIELDS = EMPLOYEE_FILTER_FIELDS

  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return EmployeeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<EmployeeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('employee.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.employeeRepository.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .leftJoinAndSelect('employee.position', 'position')
      .leftJoinAndSelect('employee.createdByUser', 'uc')
  }

  getAllEmployee() {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .leftJoinAndSelect('employee.position', 'position')
      .getRawMany();
  }

  /**
   * Get employee by id
   */
  public async getEmployeeById(id: number): Promise<EmployeeResponseDto> {
    const entity = await this.getListQuery()
      .where('employee.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return EmployeeMapper.toDto(entity);
  }

  /**
   * Create new employee
   */
  public async createEmployee(
    dto: CreateEmployeeRequestDto,
  ): Promise<EmployeeResponseDto> {
    try {
      let entity = EmployeeMapper.toCreateEntity(dto);
      entity = await this.employeeRepository.save(entity);
      return EmployeeMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new EmployeeExistsException(dto.employeeCode);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update employee by id
   */
  public async updateEmployee(
    id: number,
    dto: UpdateEmployeeRequestDto,
  ): Promise<EmployeeResponseDto> {
    let entity = await this.employeeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = EmployeeMapper.toUpdateEntity(entity, dto);
      entity = await this.employeeRepository.save(entity);
      return EmployeeMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new EmployeeExistsException(dto.employeeCode);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update employee by id
   */
  public async deleteEmployee(
    id: number
  ): Promise<EmployeeResponseDto> {
    let entity = await this.employeeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.employeeRepository.delete({ id: id });
      return EmployeeMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
