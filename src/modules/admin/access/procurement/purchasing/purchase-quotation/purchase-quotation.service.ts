import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository, SelectQueryBuilder } from "typeorm";
import {
  CreatePurchaseQuotationRequestDto,
  PurchaseQuotationResponseDto,
  UpdatePurchaseQuotationRequestDto,
} from "./dtos";
import { PurchaseQuotationItemEntity } from "./purchase-quotation-item.entity";
import { PurchaseQuotationEntity } from "./purchase-quotation.entity";
import { PurchaseQuotationMapper } from "./purchase-quotation.mapper";

export const PURCHASE_QUOTATION_FILTER_FIELDS = [
  "quotationNumber",
  "quotationType",
  "description",
  "currencyCode",
  "documentReference",
  "vendor.code",
  "project.code",
  "branch.code",
];
@Injectable()
export class PurchaseQuotationService extends BaseCrudService {
  protected queryName: string = "purchaseQuotation";
  protected SEARCH_FIELDS = [
    "quotationNumber",
    "quotationType",
    "description",
    "currencyCode",
    "documentReference",
    "status",
    "vendor.code",
    "project.code",
    "branch.code",
  ];
  protected FILTER_FIELDS = PURCHASE_QUOTATION_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseQuotationEntity)
    private purchaseQuotationRepository: Repository<PurchaseQuotationEntity>,
    @InjectRepository(PurchaseQuotationItemEntity)
    private purchaseQuotationItemRepository: Repository<PurchaseQuotationItemEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseQuotationMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseQuotationEntity> } = {
      status: (query: SelectQueryBuilder<PurchaseQuotationEntity>, value) => {
        return query.andWhere(`${this.queryName}.status IN (:...status)`, {
          status: value.split(","),
        });
      },
      requestDate: (
        query: SelectQueryBuilder<PurchaseQuotationEntity>,
        value
      ) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseQuotation.requestDate BETWEEN :start AND :end",
          { start, end }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseQuotation.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseQuotationRepository
      .createQueryBuilder("purchaseQuotation")
      .leftJoinAndSelect("purchaseQuotation.branch", "branch")
      .leftJoinAndSelect("purchaseQuotation.project", "project")
      .leftJoinAndSelect("purchaseQuotation.vendor", "vendor")
      .leftJoinAndSelect("purchaseQuotation.requestedByUser", "requestedByUser")
      .leftJoinAndSelect("purchaseQuotation.createdByUser", "uc");
  }

  getAllPurchaseQuotation() {
    return this.purchaseQuotationRepository.find({
      select: {
        id: true,
        quotationNumber: true,
      },
    });
  }

  /**
   * Get purchase-quotation by id
   */
  public async getPurchaseQuotationById(
    id: number
  ): Promise<PurchaseQuotationResponseDto> {
    const entity = await this.purchaseQuotationRepository.findOne({
      where: { id: id },
      relations: {
        branch: true,
        createdByUser: true,
        project: true,
        items: true,
        updatedByUser: true,
        vendor: true,
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }
    return PurchaseQuotationMapper.toDto(entity);
  }

  /**
   * Create new purchase-quotation
   */
  public async createPurchaseQuotation(
    dto: CreatePurchaseQuotationRequestDto
  ): Promise<PurchaseQuotationResponseDto> {
    try {
      let entity = PurchaseQuotationMapper.toCreateEntity(dto);
      entity = await this.purchaseQuotationRepository.save(entity);
      return PurchaseQuotationMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-quotation by id
   */
  public async updatePurchaseQuotation(
    id: number,
    dto: UpdatePurchaseQuotationRequestDto
  ): Promise<PurchaseQuotationResponseDto> {
    let entity = await this.purchaseQuotationRepository.findOne({
      where: { id },
      relations: {
        items: true,
      },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      const existingItemIds = entity.items.map((item) => item.id);
      const dtoItemIds = dto.items?.map((item) => item.id) ?? [];
      const itemsToRemove = existingItemIds.filter(
        (itemId) => !dtoItemIds.includes(itemId)
      );

      if (itemsToRemove.length > 0) {
        await this.purchaseQuotationItemRepository.delete(itemsToRemove);
      }

      entity = PurchaseQuotationMapper.toUpdateEntity(entity, dto);
      entity = await this.purchaseQuotationRepository.save(entity);
      return PurchaseQuotationMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-quotation by id
   */
  public async deletePurchaseQuotation(
    id: number
  ): Promise<PurchaseQuotationResponseDto> {
    let entity = await this.purchaseQuotationRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseQuotationRepository.delete({ id: id });
      return PurchaseQuotationMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
