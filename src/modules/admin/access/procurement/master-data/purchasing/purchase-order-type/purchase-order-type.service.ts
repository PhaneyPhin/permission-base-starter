import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import {
  CreatePurchaseOrderTypeRequestDto,
  PurchaseOrderTypeResponseDto,
  UpdatePurchaseOrderTypeRequestDto,
} from "./dtos";
import { PurchaseOrderTypeEntity } from "./purchase-order-type.entity";
import { PurchaseOrderTypeMapper } from "./purchase-order-type.mapper";

export const PURCHASE_ORDER_TYPE_FILTER_FIELDS = ["code", "nameEn", "nameKh"];
@Injectable()
export class PurchaseOrderTypeService extends BaseCrudService {
  protected queryName: string = "purchaseOrderType";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh"];
  protected FILTER_FIELDS = PURCHASE_ORDER_TYPE_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseOrderTypeEntity)
    private purchaseOrderTypeRepository: Repository<PurchaseOrderTypeEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseOrderTypeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseOrderTypeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseOrderType.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseOrderTypeRepository
      .createQueryBuilder("purchaseOrderType")
      .leftJoinAndSelect("purchaseOrderType.defaultPRType", "dpr")
      .leftJoinAndSelect("purchaseOrderType.createdByUser", "uc");
  }

  getAllPurchaseOrderType() {
    return this.purchaseOrderTypeRepository.find({
      select: {
        nameEn: true,
        nameKh: true,
        id: true,
      },
    });
  }

  /**
   * Get purchase-order-type by id
   */
  public async getPurchaseOrderTypeById(
    id: number
  ): Promise<PurchaseOrderTypeResponseDto> {
    const entity = await this.getListQuery()
      .where("purchaseOrderType.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return PurchaseOrderTypeMapper.toDto(entity);
  }

  /**
   * Create new purchase-order-type
   */
  public async createPurchaseOrderType(
    dto: CreatePurchaseOrderTypeRequestDto
  ): Promise<PurchaseOrderTypeResponseDto> {
    try {
      let entity = PurchaseOrderTypeMapper.toCreateEntity(dto);
      entity = await this.purchaseOrderTypeRepository.save(entity);
      return PurchaseOrderTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-order-type by id
   */
  public async updatePurchaseOrderType(
    id: number,
    dto: UpdatePurchaseOrderTypeRequestDto
  ): Promise<PurchaseOrderTypeResponseDto> {
    let entity = await this.purchaseOrderTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = PurchaseOrderTypeMapper.toUpdateEntity(entity, dto);
      entity = await this.purchaseOrderTypeRepository.save(entity);
      return PurchaseOrderTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-order-type by id
   */
  public async deletePurchaseOrderType(
    id: number
  ): Promise<PurchaseOrderTypeResponseDto> {
    let entity = await this.purchaseOrderTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseOrderTypeRepository.delete({ id: id });
      return PurchaseOrderTypeMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
