import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CategoryMapper } from "./category.mapper";
import {
  CategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from "./dtos";

export const CATEGORY_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "description",
];
@Injectable()
export class CategoryService extends BaseCrudService {
  protected queryName: string = "category";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh", "description"];
  protected FILTER_FIELDS = CATEGORY_FILTER_FIELDS;

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return CategoryMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<CategoryEntity> } = {
      // parent: (query, value) => {
      //   return query.andWhere(
      //     "parent.name_en ILIKE %parent% or parent.name_kh ILIKE %parent%",
      //     { parent: value }
      //   );
      // },
      itemGroup: (query, value) => {
        return query.andWhere(
          "itemGroup.name_en ILIKE %itemGroup% or itemGroup.name_kh ILIKE %itemGroup%",
          { itemGroup: value }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("category.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return (
      this.categoryRepository
        .createQueryBuilder("category")
        // .leftJoinAndSelect("category.parent", "parent")
        .leftJoinAndSelect("category.itemGroup", "itemGroup")
        .leftJoinAndSelect("category.createdByUser", "uc")
    );
  }

  async getAllCategory() {
    return (await this.getListQuery().getMany()).map(
      CategoryMapper.toSelectDto
    );
  }
  async getCategoryByItemGroup(
    itemGroupId?: number
  ): Promise<{ id: number; nameEn: string; nameKh: string }[]> {
    const query = this.categoryRepository
      .createQueryBuilder("category")
      .select([
        "category.id",
        "category.nameEn",
        "category.nameKh",
        // "category.parentId",
      ]);

    if (itemGroupId) {
      query.andWhere("category.itemGroupId = :itemGroupId", { itemGroupId });
    }
    const categories = await query.getMany();
    return categories.map(CategoryMapper.toSelectDto);
  }

  /**
   * Get category by id
   */
  public async getCategoryById(id: number): Promise<CategoryResponseDto> {
    const entity = await this.getListQuery()
      .where("category.id = :id", { id })
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
    dto: CreateCategoryRequestDto
  ): Promise<CategoryResponseDto> {
    try {
      let entity = CategoryMapper.toCreateEntity(dto);
      entity = await this.categoryRepository.save(entity);
      return CategoryMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update category by id
   */
  public async updateCategory(
    id: number,
    dto: UpdateCategoryRequestDto
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
      handleError(error, dto);
    }
  }

  /**
   * Update category by id
   */
  public async deleteCategory(id: number): Promise<CategoryResponseDto> {
    let entity = await this.categoryRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.categoryRepository.delete({ id: id });
      return CategoryMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
