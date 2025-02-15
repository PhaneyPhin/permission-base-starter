import { ModuleStatus } from "@common/enums/status.enum";
import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, FindOptionsWhere, In, Repository } from "typeorm";
import { CategoryEntity } from "../master-data/category/category.entity";
import { ItemGroupEntity } from "../master-data/item-group/item-group.entity";
import { UomEntity } from "../master-data/uom/uom.entity";
import { ValuationMethodEntity } from "../master-data/valuation-method/valuation-method.entity";
import {
  CreateItemRequestDto,
  ItemResponseDto,
  UpdateItemRequestDto,
} from "./dtos";
import { ItemEntity } from "./item.entity";
import { ItemMapper } from "./item.mapper";

export const ITEM_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "itemType",
  "status",
  "note",
];
@Injectable()
export class ItemService extends BaseCrudService {
  protected queryName: string = "item";
  protected SEARCH_FIELDS = [
    "code",
    "nameEn",
    "nameKh",
    "itemType",
    "status",
    "note",
  ];
  protected FILTER_FIELDS = ITEM_FILTER_FIELDS;

  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return ItemMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<ItemEntity> } = {
      itemGroup: (query, value) => {
        return query.andWhere(
          "itemGroup.name_en ILIKE :itemGroup or itemGroup.name_kh ILIKE :itemGroup",
          { itemGroup: `%${value}%` }
        );
      },
      valuationMethod: (query, value) => {
        return query.andWhere(
          "valuationMethod.name_en ILIKE :valuationMethod or valuationMethod.name_kh ILIKE :valuationMethod",
          { valuationMethod: `%${value}%` }
        );
      },
      category: (query, value) => {
        return query.andWhere(
          "category.name_en ILIKE :category or category.name_kh ILIKE :category",
          { category: `%${value}%` }
        );
      },
      uom: (query, value) => {
        return query.andWhere(
          "uom.name_en ILIKE :uom or uom.name_kh ILIKE :uom",
          { uom: `%${value}%` }
        );
      },
      minStock: (query, value) => {
        return query.andWhere("item.min_stock = :minStock", {
          minStock: `%${value}%`,
        });
      },
      standardCost: (query, value) => {
        return query.andWhere("item.standard_cost = :standardCost", {
          standardCost: `%${value}%`,
        });
      },
      unitCost: (query, value) => {
        return query.andWhere("item.unit_cost = :unitCost", {
          unitCost: `%${value}%`,
        });
      },
      itemType: (query, value) => {
        return query.andWhere("item.item_type = :itemType", {
          itemType: value,
        });
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("item.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.itemRepository
      .createQueryBuilder("item")
      .leftJoinAndSelect("item.category", "category")
      .leftJoinAndSelect("item.uom", "uom")
      .leftJoinAndSelect("item.itemGroup", "itemGroup")
      .leftJoinAndSelect("item.valuationMethod", "valuationMethod")
      .leftJoinAndSelect("item.createdByUser", "uc")
      .leftJoinAndSelect("item.updatedByUser", "uu")
      .where("item.item_type IN (:...allowedTypes)", {
        allowedTypes: ["inventory", "non_stock_item"],
      });
  }
  async getAllItem() {
    return (await this.getListQuery().getMany()).map(ItemMapper.toSelectDto);
  }

  /**
   * Get item by id
   */
  public async getItemById(id: number): Promise<ItemResponseDto> {
    const entity = await this.getListQuery()
      .where("item.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return ItemMapper.toDto(entity);
  }

  /**
   * Create new item
   */
  public async createItem(dto: CreateItemRequestDto): Promise<ItemResponseDto> {
    try {
      let entity = ItemMapper.toCreateEntity(dto);
      entity = await this.itemRepository.save(entity);
      return ItemMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }
  public async updateItem(
    id: number,
    dto: UpdateItemRequestDto
  ): Promise<ItemResponseDto> {
    const entity = await this.itemRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      const updatedEntity = ItemMapper.toUpdateEntity(entity, dto);
      const savedEntity = await this.itemRepository.save(updatedEntity);
      return ItemMapper.toDto(savedEntity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update item by id
   */
  public async deleteItem(id: number): Promise<ItemResponseDto> {
    let entity = await this.itemRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.itemRepository.delete({ id: id });
      return ItemMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }

  public async updateItemStatuses(ids: number[]): Promise<number[]> {
    const profiles = await this.itemRepository.find({
      where: { id: In(ids) },
    });
    const foundIds = profiles.map((profile) => profile.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Item with IDs ${missingIds.join(", ")} not found.`
      );
    }
    await this.itemRepository
      .createQueryBuilder()
      .update()
      .set({ status: ModuleStatus.INACTIVE })
      .whereInIds(ids)
      .execute();

    return ids;
  }
}
