import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import { DepartmentEntity } from "./department.entity";
import { DepartmentMapper } from "./department.mapper";
import {
  CreateDepartmentRequestDto,
  DepartmentResponseDto,
  UpdateDepartmentRequestDto,
} from "./dtos";

export const DEPARTMENT_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "description",
];
@Injectable()
export class DepartmentService extends BaseCrudService {
  protected queryName: string = "department";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh", "description"];
  protected FILTER_FIELDS = DEPARTMENT_FILTER_FIELDS;

  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return DepartmentMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<DepartmentEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("department.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.departmentRepository
      .createQueryBuilder("department")
      .leftJoinAndSelect("department.createdByUser", "uc");
  }
  async getAllDepartment() {
    return (await this.getListQuery().getMany()).map(
      DepartmentMapper.toSelectDto
    );
  }

  /**
   * Get department by id
   */
  public async getDepartmentById(id: number): Promise<DepartmentResponseDto> {
    const entity = await this.getListQuery()
      .where("department.id = :id", { id })
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
    dto: CreateDepartmentRequestDto
  ): Promise<DepartmentResponseDto> {
    try {
      let entity = DepartmentMapper.toCreateEntity(dto);
      entity = await this.departmentRepository.save(entity);
      return DepartmentMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update department by id
   */
  public async updateDepartment(
    id: number,
    dto: UpdateDepartmentRequestDto
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
      handleError(error, dto);
    }
  }

  /**
   * Update department by id
   */
  public async deleteDepartment(id: number): Promise<DepartmentResponseDto> {
    let entity = await this.departmentRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.departmentRepository.delete({ id: id });
      return DepartmentMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
