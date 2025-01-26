import { DBErrorCode } from "@common/enums";
import { BaseCrudService } from "@common/services/base-crud.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimeoutError } from "rxjs";
import { Filter, Repository } from "typeorm";
import {
  CreateItemGroupRequestDto,
  ItemGroupResponseDto,
  UpdateItemGroupRequestDto,
} from "./dtos";
import { ItemGroupExistsException } from "./item-group-exist.exception"; // e.g., custom exception
import { ItemGroupEntity } from "./item-group.entity";
import { ItemGroupMapper } from "./item-group.mapper";

export const ITEM_GROUP_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "description",
];
@Injectable()
export class ItemGroupService extends BaseCrudService {
  protected queryName: string = "itemGroup";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh", "description"];
  protected FILTER_FIELDS = ITEM_GROUP_FILTER_FIELDS;

  constructor(
    @InjectRepository(ItemGroupEntity)
    private itemGroupRepository: Repository<ItemGroupEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return ItemGroupMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<ItemGroupEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("itemGroup.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.itemGroupRepository
      .createQueryBuilder("itemGroup")
      .leftJoinAndSelect("itemGroup.createdByUser", "uc");
  }
  async getAllItemGroup() {
    return (await this.getListQuery().getMany()).map(
      ItemGroupMapper.toSelectDto
    );
  }

  /**
   * Get item-group by id
   */
  public async getItemGroupById(id: number): Promise<ItemGroupResponseDto> {
    const entity = await this.getListQuery()
      .where("itemGroup.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return ItemGroupMapper.toDto(entity);
  }

  /**
   * Create new item-group
   */
  public async createItemGroup(
    dto: CreateItemGroupRequestDto
  ): Promise<ItemGroupResponseDto> {
    try {
      let entity = ItemGroupMapper.toCreateEntity(dto);
      entity = await this.itemGroupRepository.save(entity);
      return ItemGroupMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ItemGroupExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update item-group by id
   */
  public async updateItemGroup(
    id: number,
    dto: UpdateItemGroupRequestDto
  ): Promise<ItemGroupResponseDto> {
    let entity = await this.itemGroupRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = ItemGroupMapper.toUpdateEntity(entity, dto);
      entity = await this.itemGroupRepository.save(entity);
      return ItemGroupMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ItemGroupExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update item-group by id
   */
  public async deleteItemGroup(id: number): Promise<ItemGroupResponseDto> {
    let entity = await this.itemGroupRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.itemGroupRepository.delete({ id: id });
      return ItemGroupMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
