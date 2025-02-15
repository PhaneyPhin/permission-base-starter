import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import {
  CreateQuotationTypeRequestDto,
  QuotationTypeResponseDto,
  UpdateQuotationTypeRequestDto,
} from "./dtos";
import { QuotationTypeEntity } from "./quotation-type.entity";
import { QuotationTypeMapper } from "./quotation-type.mapper";

export const QUOTATION_TYPE_FILTER_FIELDS = ["code", "nameEn", "nameKh"];
@Injectable()
export class QuotationTypeService extends BaseCrudService {
  protected queryName: string = "quotationType";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh"];
  protected FILTER_FIELDS = QUOTATION_TYPE_FILTER_FIELDS;

  constructor(
    @InjectRepository(QuotationTypeEntity)
    private quotationTypeRepository: Repository<QuotationTypeEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return QuotationTypeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<QuotationTypeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "quotationType.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.quotationTypeRepository
      .createQueryBuilder("quotationType")
      .leftJoinAndSelect("quotationType.defaultPOType", "dpo")
      .leftJoinAndSelect("quotationType.createdByUser", "uc");
  }

  getAllQuotationType() {
    return this.quotationTypeRepository.find({
      select: {
        id: true,
        nameEn: true,
        nameKh: true,
      },
    });
  }

  /**
   * Get quotation-type by id
   */
  public async getQuotationTypeById(
    id: number
  ): Promise<QuotationTypeResponseDto> {
    const entity = await this.getListQuery()
      .where("quotationType.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return QuotationTypeMapper.toDto(entity);
  }

  /**
   * Create new quotation-type
   */
  public async createQuotationType(
    dto: CreateQuotationTypeRequestDto
  ): Promise<QuotationTypeResponseDto> {
    try {
      let entity = QuotationTypeMapper.toCreateEntity(dto);
      entity = await this.quotationTypeRepository.save(entity);
      return QuotationTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update quotation-type by id
   */
  public async updateQuotationType(
    id: number,
    dto: UpdateQuotationTypeRequestDto
  ): Promise<QuotationTypeResponseDto> {
    let entity = await this.quotationTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = QuotationTypeMapper.toUpdateEntity(entity, dto);
      entity = await this.quotationTypeRepository.save(entity);
      return QuotationTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update quotation-type by id
   */
  public async deleteQuotationType(
    id: number
  ): Promise<QuotationTypeResponseDto> {
    let entity = await this.quotationTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.quotationTypeRepository.delete({ id: id });
      return QuotationTypeMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
