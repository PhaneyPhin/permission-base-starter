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
  CreateEmployeePositionRequestDto,
  EmployeePositionResponseDto,
  UpdateEmployeePositionRequestDto,
} from "./dtos";
import { EmployeePositionEntity } from "./employee-position.entity";
import { EmployeePositionMapper } from "./employee-position.mapper";

export const EMPLOYEE_POSITION_FILTER_FIELDS = ["code", "nameEn", "nameKh"];
@Injectable()
export class EmployeePositionService extends BaseCrudService {
  protected queryName: string = "employeePosition";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh"];
  protected FILTER_FIELDS = EMPLOYEE_POSITION_FILTER_FIELDS;

  constructor(
    @InjectRepository(EmployeePositionEntity)
    private employeePositionRepository: Repository<EmployeePositionEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return EmployeePositionMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<EmployeePositionEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "employeePosition.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.employeePositionRepository
      .createQueryBuilder("employeePosition")
      .leftJoinAndSelect("employeePosition.createdByUser", "uc");
  }
  async getAllEmployeePosition() {
    return (await this.getListQuery().getMany()).map(
      EmployeePositionMapper.toSelectDto
    );
  }

  /**
   * Get employee-position by id
   */
  public async getEmployeePositionById(
    id: number
  ): Promise<EmployeePositionResponseDto> {
    const entity = await this.getListQuery()
      .where("employeePosition.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return EmployeePositionMapper.toDto(entity);
  }

  /**
   * Create new employee-position
   */
  public async createEmployeePosition(
    dto: CreateEmployeePositionRequestDto
  ): Promise<EmployeePositionResponseDto> {
    try {
      let entity = EmployeePositionMapper.toCreateEntity(dto);
      entity = await this.employeePositionRepository.save(entity);
      return EmployeePositionMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update employee-position by id
   */
  public async updateEmployeePosition(
    id: number,
    dto: UpdateEmployeePositionRequestDto
  ): Promise<EmployeePositionResponseDto> {
    let entity = await this.employeePositionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = EmployeePositionMapper.toUpdateEntity(entity, dto);
      entity = await this.employeePositionRepository.save(entity);
      return EmployeePositionMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update employee-position by id
   */
  public async deleteEmployeePosition(
    id: number
  ): Promise<EmployeePositionResponseDto> {
    let entity = await this.employeePositionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.employeePositionRepository.delete({ id: id });
      return EmployeePositionMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
