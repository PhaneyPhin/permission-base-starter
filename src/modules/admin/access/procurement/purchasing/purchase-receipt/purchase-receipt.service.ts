import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository, SelectQueryBuilder } from "typeorm";
import {
  CreatePurchaseReceiptRequestDto,
  PurchaseReceiptResponseDto,
  UpdatePurchaseReceiptRequestDto,
} from "./dtos";
import { PurchaseReceiptItemEntity } from "./purchase-receipt-item.entity";
import { PurchaseReceiptEntity } from "./purchase-receipt.entity";
import { PurchaseReceiptMapper } from "./purchase-receipt.mapper";

export const PURCHASE_RECEIPT_FILTER_FIELDS = [
  "receiptNumber",
  "vendorName",
  "documentRef",
  "secondRef",
  "poRef",
  "billingDate",
  "totalPercentageDiscount",
  "receiptRef",
  "currencyCode",
  "description",
  "status",
];
@Injectable()
export class PurchaseReceiptService extends BaseCrudService {
  protected queryName: string = "purchaseReceipt";
  protected SEARCH_FIELDS = [
    "receiptNumber",
    "vendorName",
    "documentRef",
    "secondRef",
    "poRef",
    "receiptRef",
    "currencyCode",
    "description",
    "status",
  ];
  protected FILTER_FIELDS = PURCHASE_RECEIPT_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseReceiptEntity)
    private purchaseReceiptRepository: Repository<PurchaseReceiptEntity>,
    @InjectRepository(PurchaseReceiptItemEntity)
    private purchaseReceiptItemRepository: Repository<PurchaseReceiptItemEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseReceiptMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseReceiptEntity> } = {
      poType: (query, value) => {
        return query.andWhere(
          "poType.name_en ILIKE :poType or poType.name_kh ILIKE :poType",
          { poType: `%${value}%` }
        );
      },
      branch: (query, value) => {
        return query.andWhere(
          "branch.name_en ILIKE :branch or branch.name_kh ILIKE :branch",
          { branch: `%${value}%` }
        );
      },
      vendor: (query, value) => {
        return query.andWhere(
          "vendor.name_en ILIKE :vendor or vendor.name_kh ILIKE :vendor",
          { vendor: `%${value}%` }
        );
      },
      project: (query, value) => {
        return query.andWhere(
          "project.name_en ILIKE :project or project.name_kh ILIKE :project",
          { project: `%${value}%` }
        );
      },

      status: (query: SelectQueryBuilder<PurchaseReceiptEntity>, value) => {
        return query.andWhere(`${this.queryName}.status IN (:...status)`, {
          status: value.split(","),
        });
      },
      receiptDate: (
        query: SelectQueryBuilder<PurchaseReceiptEntity>,
        value
      ) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseReceipt.receiptDate BETWEEN :start AND :end",
          {
            start,
            end,
          }
        );
      },
      billingDate: (
        query: SelectQueryBuilder<PurchaseReceiptEntity>,
        value
      ) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseReceipt.billingDate BETWEEN :start AND :end",
          {
            start,
            end,
          }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseReceipt.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseReceiptRepository
      .createQueryBuilder("purchaseReceipt")
      .leftJoinAndSelect("purchaseReceipt.poType", "poType")
      .leftJoinAndSelect("purchaseReceipt.branch", "branch")
      .leftJoinAndSelect("purchaseReceipt.project", "project")
      .leftJoinAndSelect("purchaseReceipt.vendor", "vendor")
      .leftJoinAndSelect("purchaseReceipt.updatedByUser", "updatedByUser")
      .leftJoinAndSelect("purchaseReceipt.createdByUser", "uc");
  }
  getAllPurchaseReceipt() {
    return this.purchaseReceiptRepository.find({
      select: {
        id: true,
        receiptNumber: true,
      },
    });
  }

  /**
   * Get purchase-receipt by id
   */
  public async getPurchaseReceiptById(
    id: number
  ): Promise<PurchaseReceiptResponseDto> {
    const entity = await this.purchaseReceiptRepository.findOne({
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
    return PurchaseReceiptMapper.toDto(entity);
  }

  /**
   * Create new purchase-receipt
   */
  public async createPurchaseReceipt(
    dto: CreatePurchaseReceiptRequestDto
  ): Promise<PurchaseReceiptResponseDto> {
    try {
      let entity = PurchaseReceiptMapper.toCreateEntity(dto);
      entity = await this.purchaseReceiptRepository.save(entity);
      return PurchaseReceiptMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-receipt by id
   */

  public async updatePurchaseReceipt(
    id: number,
    dto: UpdatePurchaseReceiptRequestDto
  ): Promise<PurchaseReceiptResponseDto> {
    let entity = await this.purchaseReceiptRepository.findOne({
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
        await this.purchaseReceiptItemRepository.delete(itemsToRemove);
      }

      entity = PurchaseReceiptMapper.toUpdateEntity(entity, dto);
      console.log("before save", entity);
      entity = await this.purchaseReceiptRepository.save(entity);
      return PurchaseReceiptMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-receipt by id
   */
  public async deletePurchaseReceipt(
    id: number
  ): Promise<PurchaseReceiptResponseDto> {
    let entity = await this.purchaseReceiptRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseReceiptRepository.delete({ id: id });
      return PurchaseReceiptMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
