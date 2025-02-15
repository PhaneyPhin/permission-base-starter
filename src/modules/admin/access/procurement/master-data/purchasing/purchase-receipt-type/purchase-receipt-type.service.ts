import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import {
  CreatePurchaseReceiptTypeRequestDto,
  PurchaseReceiptTypeResponseDto,
  UpdatePurchaseReceiptTypeRequestDto,
} from "./dtos";
import { PurchaseReceiptTypeEntity } from "./purchase-receipt-type.entity";
import { PurchaseReceiptTypeMapper } from "./purchase-receipt-type.mapper";

export const PURCHASE_RECEIPT_TYPE_FILTER_FIELDS = ["code", "nameEn", "nameKh"];
@Injectable()
export class PurchaseReceiptTypeService extends BaseCrudService {
  protected queryName: string = "purchaseReceiptType";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh"];
  protected FILTER_FIELDS = PURCHASE_RECEIPT_TYPE_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseReceiptTypeEntity)
    private purchaseReceiptTypeRepository: Repository<PurchaseReceiptTypeEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseReceiptTypeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseReceiptTypeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseReceiptType.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseReceiptTypeRepository
      .createQueryBuilder("purchaseReceiptType")
      .leftJoinAndSelect("purchaseReceiptType.createdByUser", "uc");
  }

  getAllPurchaseReceiptType() {
    return this.purchaseReceiptTypeRepository.find({
      select: {
        nameEn: true,
        nameKh: true,
        id: true,
      },
    });
  }

  /**
   * Get purchase-receipt-type by id
   */
  public async getPurchaseReceiptTypeById(
    id: number
  ): Promise<PurchaseReceiptTypeResponseDto> {
    const entity = await this.getListQuery()
      .where("purchaseReceiptType.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return PurchaseReceiptTypeMapper.toDto(entity);
  }

  /**
   * Create new purchase-receipt-type
   */
  public async createPurchaseReceiptType(
    dto: CreatePurchaseReceiptTypeRequestDto
  ): Promise<PurchaseReceiptTypeResponseDto> {
    try {
      let entity = PurchaseReceiptTypeMapper.toCreateEntity(dto);
      entity = await this.purchaseReceiptTypeRepository.save(entity);
      return PurchaseReceiptTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-receipt-type by id
   */
  public async updatePurchaseReceiptType(
    id: number,
    dto: UpdatePurchaseReceiptTypeRequestDto
  ): Promise<PurchaseReceiptTypeResponseDto> {
    let entity = await this.purchaseReceiptTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = PurchaseReceiptTypeMapper.toUpdateEntity(entity, dto);
      entity = await this.purchaseReceiptTypeRepository.save(entity);
      return PurchaseReceiptTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-receipt-type by id
   */
  public async deletePurchaseReceiptType(
    id: number
  ): Promise<PurchaseReceiptTypeResponseDto> {
    let entity = await this.purchaseReceiptTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseReceiptTypeRepository.delete({ id: id });
      return PurchaseReceiptTypeMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
