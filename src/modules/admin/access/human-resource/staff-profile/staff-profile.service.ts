import { ModuleStatus } from "@common/enums/status.enum";
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
import { Filter, FindOptionsWhere, In, Repository } from "typeorm";
import { BranchEntity } from "../../branch/branch.entity";
import { DepartmentEntity } from "../../department/department.entity";
import { EmployeePositionEntity } from "../master-data/employee-position/employee-position.entity";
import {
  CreateStaffProfileRequestDto,
  StaffProfileResponseDto,
  UpdateStaffProfileRequestDto,
} from "./dtos";
import { StaffProfileEntity } from "./staff-profile.entity";
import { StaffProfileMapper } from "./staff-profile.mapper";

export const STAFF_PROFILE_FILTER_FIELDS = [
  "staffCode",
  "nameEn",
  "nameKh",
  "sex",
  "title",
  "maritalStatus",
  "nationality",
  "religion",
  "companyCardNo",
  "identityId",
  "phone1",
  "phone2",
  "workingEmail",
  "personalEmail",
  "placeOfBirth",
  "permanentAddress",
  "currenAddress",
  "profileImage",
  "signatureImage",
];
@Injectable()
export class StaffProfileService extends BaseCrudService {
  protected queryName: string = "staffProfile";
  protected SEARCH_FIELDS = [
    "staffCode",
    "nameEn",
    "nameKh",
    "sex",
    "title",
    "maritalStatus",
    "nationality",
    "religion",
    "companyCardNo",
    "identityId",
    "phone1",
    "phone2",
    "workingEmail",
    "personalEmail",
    "placeOfBirth",
    "permanentAddress",
    "currenAddress",
    "profileImage",
    "signatureImage",
  ];
  protected FILTER_FIELDS = STAFF_PROFILE_FILTER_FIELDS;

  constructor(
    @InjectRepository(StaffProfileEntity)
    private staffProfileRepository: Repository<StaffProfileEntity>,

    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,

    @InjectRepository(EmployeePositionEntity)
    private employeePositionRepository: Repository<EmployeePositionEntity>,

    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return StaffProfileMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<StaffProfileEntity> } = {
      hiredDate: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "staffProfile.hired_date BETWEEN :start AND :end",
          { start, end }
        );
      },
      dateOfBirth: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "staffProfile.date_of_birth BETWEEN :start AND :end",
          { start, end }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "staffProfile.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
      branch: (query, value) => {
        return query.andWhere(
          "branch.name_en ILIKE %branch% or branch.name_kh ILIKE %branch%",
          { branch: value }
        );
      },
      position: (query, value) => {
        return query.andWhere(
          "position.name_en ILIKE %position% or position.name_kh ILIKE %position%",
          { position: value }
        );
      },
      department: (query, value) => {
        return query.andWhere(
          "department.name_en ILIKE %department% or department.name_kh ILIKE %department%",
          { department: value }
        );
      },
    };

    return filters;
  }
  /** Require for base query list of feature */
  protected getListQuery() {
    return this.staffProfileRepository
      .createQueryBuilder("staffProfile")
      .leftJoinAndSelect("staffProfile.createdByUser", "uc")
      .leftJoinAndSelect("staffProfile.branch", "branch")
      .leftJoinAndSelect("staffProfile.position", "position")
      .leftJoinAndSelect("staffProfile.department", "department");
  }
  async getAllStaffProfile() {
    return (await this.getListQuery().getMany()).map(
      StaffProfileMapper.toSelectDto
    );
  }

  /**
   * Get staff-profile by id
   */
  public async getStaffProfileById(
    id: number
  ): Promise<StaffProfileResponseDto> {
    const entity = await this.getListQuery()
      .where("staffProfile.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return StaffProfileMapper.toDto(entity);
  }

  /**
   * Create new staff-profile
   */
  public async createStaffProfile(
    dto: CreateStaffProfileRequestDto
  ): Promise<StaffProfileResponseDto> {
    try {
      let entity = StaffProfileMapper.toCreateEntity(dto);
      entity = await this.staffProfileRepository.save(entity);
      return StaffProfileMapper.toDto(entity);
    } catch (error) {
      console.error("Error in createStaffProfile:", error);
      handleError(error, dto);
    }
  }

  /**
   * Update staff-profile by id
   */
  public async updateStaffProfile(
    id: number,
    dto: UpdateStaffProfileRequestDto
  ): Promise<StaffProfileResponseDto> {
    // let entity = await this.staffProfileRepository.findOneBy({ id });
    const entity = await this.staffProfileRepository.findOne({
      where: { id },
      relations: ["branch", "department", "position"],
    });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      const [newBranch, newDepartment, newPosition] =
        await this.getRelatedEntities(dto);
      const updatedEntity = StaffProfileMapper.toUpdateEntity(entity, dto);
      updatedEntity.branch = newBranch;
      updatedEntity.department = newDepartment;
      updatedEntity.position = newPosition;
      const savedEntity = await this.staffProfileRepository.save(updatedEntity);
      return StaffProfileMapper.toDto(savedEntity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update staff-profile by id
   */
  public async deleteStaffProfile(
    id: number
  ): Promise<StaffProfileResponseDto> {
    let entity = await this.staffProfileRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.staffProfileRepository.delete({ id: id });
      return StaffProfileMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
  public async updateStaffProfileStatuses(ids: number[]): Promise<number[]> {
    // const profiles = await this.staffProfileRepository.findByIds(ids);
    const profiles = await this.staffProfileRepository.find({
      where: { id: In(ids) },
    });
    const foundIds = profiles.map((profile) => profile.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Staff profiles with IDs ${missingIds.join(", ")} not found.`
      );
    }
    await this.staffProfileRepository
      .createQueryBuilder()
      .update()
      .set({ status: ModuleStatus.INACTIVE })
      .whereInIds(ids)
      .execute();

    return ids;
  }

  private async fetchEntity<T extends { id: number }>(
    repository: Repository<T>,
    id: number,
    entityName: string
  ): Promise<T> {
    const entity = await repository.findOneBy({ id } as FindOptionsWhere<T>);
    if (!entity) {
      throw new NotFoundException(`${entityName} with id ${id} not found`);
    }
    return entity;
  }

  private async getRelatedEntities(
    dto: UpdateStaffProfileRequestDto
  ): Promise<[BranchEntity, DepartmentEntity, EmployeePositionEntity]> {
    const [newBranch, newDepartment, newPosition] = await Promise.all([
      this.fetchEntity(this.branchRepository, dto.branchId, "Branch"),
      this.fetchEntity(
        this.departmentRepository,
        dto.departmentId,
        "Department"
      ),
      this.fetchEntity(
        this.employeePositionRepository,
        dto.positionId,
        "Position"
      ),
    ]);
    return [newBranch, newDepartment, newPosition];
  }
}
