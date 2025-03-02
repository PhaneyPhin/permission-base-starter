import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository, SelectQueryBuilder } from "typeorm";
import {
  CreatePurchaseRequestRequestDto,
  PurchaseRequestResponseDto,
  UpdatePurchaseRequestRequestDto,
} from "./dtos";
import { PurchaseRequestItemEntity } from "./purchase-request-item.entity";
import { PurchaseRequestEntity } from "./purchase-request.entity";
import { PurchaseRequestMapper } from "./purchase-request.mapper";

export const PURCHASE_REQUEST_FILTER_FIELDS = [
  "requestNumber",
  "priority",
  "currencyCode",
  "description",
];
@Injectable()
export class PurchaseRequestService extends BaseCrudService {
  protected queryName: string = "purchaseRequest";
  protected SEARCH_FIELDS = [
    "requestNumber",
    "priority",
    "currencyCode",
    "description",
  ];
  protected FILTER_FIELDS = PURCHASE_REQUEST_FILTER_FIELDS;

  constructor(
    @InjectRepository(PurchaseRequestEntity)
    private purchaseRequestRepository: Repository<PurchaseRequestEntity>,
    @InjectRepository(PurchaseRequestItemEntity)
    private purchaseRequestItemRepository: Repository<PurchaseRequestItemEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PurchaseRequestMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PurchaseRequestEntity> } = {
      requestType: (query, value) => {
        return query.andWhere(
          "requestType.name_en ILIKE :requestType or requestType.name_kh ILIKE :requestType",
          { requestType: `%${value}%` }
        );
      },
      branch: (query, value) => {
        return query.andWhere(
          "branch.name_en ILIKE :branch or branch.name_kh ILIKE :branch",
          { branch: `%${value}%` }
        );
      },
      department: (query, value) => {
        return query.andWhere(
          "department.name_en ILIKE :department or department.name_kh ILIKE :department",
          { department: `%${value}%` }
        );
      },
      requestedBy: (query, value) => {
        return query.andWhere(
          "requestedBy.name_en ILIKE :requestedBy or requestedBy.name_kh ILIKE :requestedBy",
          { requestedBy: `%${value}%` }
        );
      },
      project: (query, value) => {
        return query.andWhere(
          "project.name_en ILIKE :project or project.name_kh ILIKE :project",
          { project: `%${value}%` }
        );
      },

      status: (query: SelectQueryBuilder<PurchaseRequestEntity>, value) => {
        return query.andWhere(`${this.queryName}.status IN (:...status)`, {
          status: value.split(","),
        });
      },
      requestDate: (
        query: SelectQueryBuilder<PurchaseRequestEntity>,
        value
      ) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseRequest.requestDate BETWEEN :start AND :end",
          { start, end }
        );
      },
      requiredDate: (
        query: SelectQueryBuilder<PurchaseRequestEntity>,
        value
      ) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseRequest.requiredDate BETWEEN :start AND :end",
          { start, end }
        );
      },
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "purchaseRequest.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.purchaseRequestRepository
      .createQueryBuilder("purchaseRequest")
      .leftJoinAndSelect("purchaseRequest.requestType", "requestType")
      .leftJoinAndSelect("purchaseRequest.branch", "branch")
      .leftJoinAndSelect("purchaseRequest.project", "project")
      .leftJoinAndSelect("purchaseRequest.department", "department")
      .leftJoinAndSelect("purchaseRequest.requestedBy", "requestedBy")
      .leftJoinAndSelect("purchaseRequest.updatedByUser", "updatedByUser")
      .leftJoinAndSelect("purchaseRequest.createdByUser", "uc");
  }

  getAllPurchaseRequest() {
    return this.purchaseRequestRepository.find({
      select: {
        id: true,
        requestNumber: true,
      },
    });
  }

  /**
   * Get purchase-request by id
   */
  public async getPurchaseRequestById(
    id: number
  ): Promise<PurchaseRequestResponseDto> {
    const entity = await this.purchaseRequestRepository.findOne({
      where: { id: id },
      relations: {
        requestType: true,
        branch: true,
        createdByUser: true,
        project: true,
        updatedByUser: true,
        department: true,
        items: true,
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }
    return PurchaseRequestMapper.toDto(entity);
  }

  /**
   * Create new purchase-request
   */
  public async createPurchaseRequest(
    dto: CreatePurchaseRequestRequestDto
  ): Promise<PurchaseRequestResponseDto> {
    try {
      let entity = PurchaseRequestMapper.toCreateEntity(dto);
      entity = await this.purchaseRequestRepository.save(entity);
      return PurchaseRequestMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-request by id
   */
  public async updatePurchaseRequest(
    id: number,
    dto: UpdatePurchaseRequestRequestDto
  ): Promise<PurchaseRequestResponseDto> {
    // let entity = await this.purchaseRequestRepository.findOneBy({ id });
    let entity = await this.purchaseRequestRepository.findOne({
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
        await this.purchaseRequestItemRepository.delete(itemsToRemove);
      }

      entity = PurchaseRequestMapper.toUpdateEntity(entity, dto);
      entity = await this.purchaseRequestRepository.save(entity);
      return PurchaseRequestMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update purchase-request by id
   */
  public async deletePurchaseRequest(
    id: number
  ): Promise<PurchaseRequestResponseDto> {
    let entity = await this.purchaseRequestRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.purchaseRequestRepository.delete({ id: id });
      return PurchaseRequestMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
