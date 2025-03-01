import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository, SelectQueryBuilder } from "typeorm";
import {
  CreatePurchaseOrderRequestDto,
  PurchaseOrderResponseDto,
  UpdatePurchaseOrderRequestDto,
} from "./dtos";
import { PurchaseOrderItemEntity } from "./purchase-order-item.entity";
import { PurchaseOrderEntity } from "./purchase-order.entity";
import { PurchaseOrderMapper } from "./purchase-order.mapper";

export const PURCHASE_ORDER_FILTER_FIELDS = [
  "poNumber",
  "vendorName",
  "documentRef",
  "secondRef",
  "poRef",
  "currencyCode",
  "description",
  "status",
];
@Injectable()
export class PurchaseOrderService extends BaseCrudService {
  protected queryName: string = "purchaseOrder";
  protected SEARCH_FIELDS = [
    "poNumber",
    "vendorName",
    "documentRef",
    "secondRef",
    "poRef",
    "currencyCode",
    "priority",
    "description",
    "status",
  ];
  protected FILTER_FIELDS = PURCHASE_ORDER_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private purchaseOrderRepository: Repository<PurchaseOrderEntity>,
    @InjectRepository(PurchaseOrderItemEntity)
    private purchaseOrderItemRepository: Repository<PurchaseOrderItemEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseOrderMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseOrderEntity> } = {
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

      status: (query: SelectQueryBuilder<PurchaseOrderEntity>, value) => {
        return query.andWhere(`${this.queryName}.status IN (:...status)`, {
          status: value.split(","),
        });
      },
      poDate: (query: SelectQueryBuilder<PurchaseOrderEntity>, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("purchaseOrder.poDate BETWEEN :start AND :end", {
          start,
          end,
        });
      },
      promisedDate: (query: SelectQueryBuilder<PurchaseOrderEntity>, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseOrder.promisedDate BETWEEN :start AND :end",
          { start, end }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseOrder.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseOrderRepository
      .createQueryBuilder("purchaseOrder")
      .leftJoinAndSelect("purchaseOrder.poType", "poType")
      .leftJoinAndSelect("purchaseOrder.branch", "branch")
      .leftJoinAndSelect("purchaseOrder.project", "project")
      .leftJoinAndSelect("purchaseOrder.vendor", "vendor")
      .leftJoinAndSelect("purchaseOrder.updatedByUser", "updatedByUser")
      .leftJoinAndSelect("purchaseOrder.createdByUser", "uc");
  }
  getAllPurchaseOrder() {
    return this.purchaseOrderRepository.find({
      select: {
        id: true,
        poNumber: true,
      },
    });
  }

  /**
   * Get purchase-order by id
   */
  public async getPurchaseOrderById(
    id: number
  ): Promise<PurchaseOrderResponseDto> {
    const entity = await this.purchaseOrderRepository.findOne({
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
    return PurchaseOrderMapper.toDto(entity);
  }

  /**
   * Create new purchase-order
   */
  public async createPurchaseOrder(
    dto: CreatePurchaseOrderRequestDto
  ): Promise<PurchaseOrderResponseDto> {
    try {
      let entity = PurchaseOrderMapper.toCreateEntity(dto);
      entity = await this.purchaseOrderRepository.save(entity);
      return PurchaseOrderMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-order by id
   */

  public async updatePurchaseOrder(
    id: number,
    dto: UpdatePurchaseOrderRequestDto
  ): Promise<PurchaseOrderResponseDto> {
    let entity = await this.purchaseOrderRepository.findOne({
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
        await this.purchaseOrderItemRepository.delete(itemsToRemove);
      }

      entity = PurchaseOrderMapper.toUpdateEntity(entity, dto);
      console.log("before save", entity);
      entity = await this.purchaseOrderRepository.save(entity);
      return PurchaseOrderMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-order by id
   */
  public async deletePurchaseOrder(
    id: number
  ): Promise<PurchaseOrderResponseDto> {
    let entity = await this.purchaseOrderRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseOrderRepository.delete({ id: id });
      return PurchaseOrderMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
