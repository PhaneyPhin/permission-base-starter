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
import { BranchEntity } from "./branch.entity";
import { BranchMapper } from "./branch.mapper";
import {
  BranchResponseDto,
  CreateBranchRequestDto,
  UpdateBranchRequestDto,
} from "./dtos";

export const BRANCH_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "contactPerson",
  "phoneNumber",
  "addressEn",
  "addressKh",
  "description",
];
@Injectable()
export class BranchService extends BaseCrudService {
  protected queryName: string = "branch";
  protected SEARCH_FIELDS = [
    "code",
    "nameEn",
    "nameKh",
    "contactPerson",
    "phoneNumber",
    "addressEn",
    "addressKh",
    "description",
  ];
  protected FILTER_FIELDS = BRANCH_FILTER_FIELDS;

  constructor(
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return BranchMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<BranchEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("branch.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.branchRepository
      .createQueryBuilder("branch")
      .leftJoinAndSelect("branch.createdByUser", "uc");
  }

  getAllBranch() {
    return this.branchRepository
      .createQueryBuilder("branch")
      .select(["branch.nameEn", "branch.id"])
      .getMany();
  }

  /**
   * Get branch by id
   */
  public async getBranchById(id: number): Promise<BranchResponseDto> {
    const entity = await this.getListQuery()
      .where("branch.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return BranchMapper.toDto(entity);
  }

  /**
   * Create new branch
   */
  public async createBranch(
    dto: CreateBranchRequestDto
  ): Promise<BranchResponseDto> {
    try {
      let entity = BranchMapper.toCreateEntity(dto);
      entity = await this.branchRepository.save(entity);
      return BranchMapper.toDto(entity);
    } catch (error) {
      console.log(error);
      handleError(error, dto);
    }
  }

  /**
   * Update branch by id
   */
  public async updateBranch(
    id: number,
    dto: UpdateBranchRequestDto
  ): Promise<BranchResponseDto> {
    let entity = await this.branchRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = BranchMapper.toUpdateEntity(entity, dto);
      entity = await this.branchRepository.save(entity);
      return BranchMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update branch by id
   */
  public async deleteBranch(id: number): Promise<BranchResponseDto> {
    let entity = await this.branchRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.branchRepository.delete({ id: id });
      return BranchMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
