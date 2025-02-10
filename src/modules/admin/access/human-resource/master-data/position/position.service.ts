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
  CreatePositionRequestDto,
  PositionResponseDto,
  UpdatePositionRequestDto,
} from "./dtos";
import { PositionEntity } from "./position.entity";
import { PositionMapper } from "./position.mapper";

export const POSITION_FILTER_FIELDS = ["code", "nameEn", "nameKh"];
@Injectable()
export class PositionService extends BaseCrudService {
  protected queryName: string = "position";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh"];
  protected FILTER_FIELDS = POSITION_FILTER_FIELDS;

  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PositionMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PositionEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("position.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.positionRepository
      .createQueryBuilder("position")
      .leftJoinAndSelect("position.createdByUser", "uc");
  }
  async getAllPosition() {
    return (await this.getListQuery().getMany()).map(
      PositionMapper.toSelectDto
    );
  }

  /**
   * Get position by id
   */
  public async getPositionById(id: number): Promise<PositionResponseDto> {
    const entity = await this.getListQuery()
      .where("position.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return PositionMapper.toDto(entity);
  }

  /**
   * Create new position
   */
  public async createPosition(
    dto: CreatePositionRequestDto
  ): Promise<PositionResponseDto> {
    try {
      let entity = PositionMapper.toCreateEntity(dto);
      entity = await this.positionRepository.save(entity);
      return PositionMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update position by id
   */
  public async updatePosition(
    id: number,
    dto: UpdatePositionRequestDto
  ): Promise<PositionResponseDto> {
    let entity = await this.positionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = PositionMapper.toUpdateEntity(entity, dto);
      entity = await this.positionRepository.save(entity);
      return PositionMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update position by id
   */
  public async deletePosition(id: number): Promise<PositionResponseDto> {
    let entity = await this.positionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.positionRepository.delete({ id: id });
      return PositionMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
