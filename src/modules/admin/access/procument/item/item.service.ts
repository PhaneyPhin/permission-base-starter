import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateItemRequestDto,
  UpdateItemRequestDto,
  ItemResponseDto,
} from './dtos';
import { ItemMapper } from './item.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { ItemEntity } from './item.entity';
import { Repository } from 'typeorm';
import { ItemExistsException } from './item-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const ITEM_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', 'itemType', 'status', 'note', ];
@Injectable()
export class ItemService extends BaseCrudService {
  protected queryName: string = 'item';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', 'itemType', 'status', 'note', ];
  protected FILTER_FIELDS = ITEM_FILTER_FIELDS

  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return ItemMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<ItemEntity> } = {
      itemGroup: (query, value) => {
        return query.andWhere('itemGroup.name_en ILIKE %itemGroup% or itemGroup.name_kh ILIKE %itemGroup%', { itemGroup: value })
      },
      valuationMethod: (query, value) => {
        return query.andWhere('valuationMethod.name_en ILIKE %valuationMethod% or valuationMethod.name_kh ILIKE %valuationMethod%', { valuationMethod: value })
      },
      category: (query, value) => {
        return query.andWhere('category.name_en ILIKE %category% or category.name_kh ILIKE %category%', { category: value })
      },
      uom: (query, value) => {
        return query.andWhere('uom.name_en ILIKE %uom% or uom.name_kh ILIKE %uom%', { uom: value })
      },
      minStock: (query, value) => {
        return query.andWhere('item.min_stock = :minStock', { minStock: value });
      },
      standardCost: (query, value) => {
        return query.andWhere('item.standard_cost = :standardCost', { standardCost: value });
      },
      unitCost: (query, value) => {
        return query.andWhere('item.unit_cost = :unitCost', { unitCost: value });
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('item.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.itemRepository.createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.uom', 'uom')
      .leftJoinAndSelect('item.itemGroup', 'itemGroup')
      .leftJoinAndSelect('item.valuationMethod', 'valuationMethod')
      .leftJoinAndSelect('item.createdByUser', 'uc')
  }
  async getAllItem() {
    return (await this.getListQuery()
      .getMany()).map(ItemMapper.toSelectDto)
  }

  /**
   * Get item by id
   */
  public async getItemById(id: number): Promise<ItemResponseDto> {
    const entity = await this.getListQuery()
      .where('item.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return ItemMapper.toDto(entity);
  }

  /**
   * Create new item
   */
  public async createItem(
    dto: CreateItemRequestDto,
  ): Promise<ItemResponseDto> {
    try {
      let entity = ItemMapper.toCreateEntity(dto);
      entity = await this.itemRepository.save(entity);
      return ItemMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ItemExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update item by id
   */
  public async updateItem(
    id: number,
    dto: UpdateItemRequestDto,
  ): Promise<ItemResponseDto> {
    let entity = await this.itemRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = ItemMapper.toUpdateEntity(entity, dto);
      entity = await this.itemRepository.save(entity);
      return ItemMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new ItemExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update item by id
   */
  public async deleteItem(
    id: number
  ): Promise<ItemResponseDto> {
    let entity = await this.itemRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.itemRepository.delete({ id: id });
      return ItemMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
