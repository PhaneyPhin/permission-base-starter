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
  CreateRequestTypeRequestDto,
  RequestTypeResponseDto,
  UpdateRequestTypeRequestDto,
} from "./dtos";
import { RequestTypeEntity } from "./request-type.entity";
import { RequestTypeMapper } from "./request-type.mapper";

export const REQUEST_TYPE_FILTER_FIELDS = [
  "code",
  "name",
  "numberRank",
  "approvalFlow",
  "defaultQuatation",
  "isRequireApproval",
];
@Injectable()
export class RequestTypeService extends BaseCrudService {
  protected queryName: string = "requestType";
  protected SEARCH_FIELDS = [
    "code",
    "name",
    "numberRank",
    "approvalFlow",
    "defaultQuatation",
    "isRequireApproval",
  ];
  protected FILTER_FIELDS = REQUEST_TYPE_FILTER_FIELDS;

  constructor(
    @InjectRepository(RequestTypeEntity)
    private requestTypeRepository: Repository<RequestTypeEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return RequestTypeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<RequestTypeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "requestType.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.requestTypeRepository
      .createQueryBuilder("requestType")
      .leftJoinAndSelect("requestType.createdByUser", "uc");
  }

  getAllRequestType() {
    return this.requestTypeRepository
      .createQueryBuilder("requestType")
      .select(["id", "name"])
      .getRawMany();
  }

  /**
   * Get request-type by id
   */
  public async getRequestTypeById(id: number): Promise<RequestTypeResponseDto> {
    const entity = await this.getListQuery()
      .where("requestType.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return RequestTypeMapper.toDto(entity);
  }

  /**
   * Create new request-type
   */
  public async createRequestType(
    dto: CreateRequestTypeRequestDto
  ): Promise<RequestTypeResponseDto> {
    try {
      let entity = RequestTypeMapper.toCreateEntity(dto);
      entity = await this.requestTypeRepository.save(entity);
      return RequestTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update request-type by id
   */
  public async updateRequestType(
    id: number,
    dto: UpdateRequestTypeRequestDto
  ): Promise<RequestTypeResponseDto> {
    let entity = await this.requestTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = RequestTypeMapper.toUpdateEntity(entity, dto);
      entity = await this.requestTypeRepository.save(entity);
      return RequestTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update request-type by id
   */
  public async deleteRequestType(id: number): Promise<RequestTypeResponseDto> {
    let entity = await this.requestTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.requestTypeRepository.delete({ id: id });
      return RequestTypeMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
