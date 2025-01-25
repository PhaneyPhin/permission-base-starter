import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
  CategoryResponseDto,
} from './dtos';
import { CategoryMapper } from './category.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryExistsException } from './category-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const CATEGORY_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', 'description', ];
@Injectable()
export class CategoryService extends BaseCrudService {
  protected queryName: string = 'category';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', 'description', ];
  protected FILTER_FIELDS = CATEGORY_FILTER_FIELDS

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return CategoryMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<CategoryEntity> } = {
      parent: (query, value) => {
        return query.andWhere('parent.name_en ILIKE %parent% or parent.name_kh ILIKE %parent%', { parent: value })
      },
      itemGroup: (query, value) => {
        return query.andWhere('itemGroup.name_en ILIKE %itemGroup% or itemGroup.name_kh ILIKE %itemGroup%', { itemGroup: value })
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('category.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.categoryRepository.createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.itemGroup', 'itemGroup')
      .leftJoinAndSelect('category.createdByUser', 'uc')
  }
  
  async getAllCategory() {
    return (await this.getListQuery()
      .getMany()).map(CategoryMapper.toSelectDto)
  }

  /**
   * Get category by id
   */
  public async getCategoryById(id: number): Promise<CategoryResponseDto> {
    const entity = await this.getListQuery()
      .where('category.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return CategoryMapper.toDto(entity);
  }

  /**
   * Create new category
   */
  public async createCategory(
    dto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    try {
      let entity = CategoryMapper.toCreateEntity(dto);
      entity = await this.categoryRepository.save(entity);
      return CategoryMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new CategoryExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update category by id
   */
  public async updateCategory(
    id: number,
    dto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    let entity = await this.categoryRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = CategoryMapper.toUpdateEntity(entity, dto);
      entity = await this.categoryRepository.save(entity);
      return CategoryMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new CategoryExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update category by id
   */
  public async deleteCategory(
    id: number
  ): Promise<CategoryResponseDto> {
    let entity = await this.categoryRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.categoryRepository.delete({ id: id });
      return CategoryMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
