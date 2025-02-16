import { UserMapper } from "@admin/access/users/users.mapper";
import { BranchMapper } from "@modules/admin/access/branch/branch.mapper";
import { AnalysisCodeMapper } from "@modules/admin/access/construction/master-data/analysis-code/analysis-code.mapper";
import { VendorMapper } from "@modules/admin/access/vendor/vendor/vendor.mapper";
import {
  CreatePurchaseQuotationRequestDto,
  PurchaseQuotationResponseDto,
  UpdatePurchaseQuotationRequestDto,
} from "./dtos";
import { PurchaseQuotationItemEntity } from "./purchase-quotation-item.entity";
import { PurchaseQuotationItemMapper } from "./purchase-quotation-item.mapper";
import { PurchaseQuotationEntity } from "./purchase-quotation.entity";

export class PurchaseQuotationMapper {
  public static async toDto(
    entity: PurchaseQuotationEntity
  ): Promise<PurchaseQuotationResponseDto> {
    const dto = new PurchaseQuotationResponseDto();
    dto.id = entity.id;
    dto.quotationNumber = entity.quotationNumber;
    dto.quotationType = entity.quotationType;
    dto.requestDate = entity.requestDate;
    dto.totalQty = entity.totalQty;
    dto.openQty = entity.openQty;
    dto.receiptQty = entity.receiptQty;
    dto.totalCost = entity.totalCost;
    dto.isApproved = entity.isApproved;
    dto.isRequireBidding = entity.isRequireBidding;
    dto.description = entity.description;
    dto.currencyCode = entity.currencyCode;
    dto.documentReference = entity.documentReference;
    dto.status = entity.status;

    // Map Relationships
    if (entity.branch) {
      dto.branch = await BranchMapper.toDto(entity.branch);
    }

    if (entity.project) {
      dto.project = await AnalysisCodeMapper.toDto(entity.project);
    }

    if (entity.vendor) {
      dto.vendor = await VendorMapper.toDto(entity.vendor);
    }

    // if (entity.requestedBy) {
    //   dto.requestedBy = await StaffProfileMapper.toDto(entity.requestedByUser);
    // }

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    // Map Items (1-to-Many Relationship)
    if (entity.items && entity.items.length > 0) {
      dto.items = await Promise.all(
        entity.items.map((item) => PurchaseQuotationItemMapper.toDto(item))
      );
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreatePurchaseQuotationRequestDto
  ): PurchaseQuotationEntity {
    const entity = new PurchaseQuotationEntity();
    entity.quotationNumber = dto.quotationNumber;
    entity.quotationType = dto.quotationType;
    entity.requestDate = dto.requestDate;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalCost = dto.totalCost;
    entity.isApproved = dto.isApproved;
    entity.isRequireBidding = dto.isRequireBidding;
    entity.description = dto.description;
    entity.currencyCode = dto.currencyCode;
    entity.documentReference = dto.documentReference;
    entity.status = dto.status;

    // Assign Foreign Key Relations
    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendor = { id: dto.vendorId } as any;
    }

    if (dto.requestedById) {
      entity.requestedByUser = { id: dto.requestedById } as any;
    }

    // Assign Items (1-to-Many Relationship)
    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto, index) => {
        const itemEntity = PurchaseQuotationItemMapper.toCreateEntity({
          ...itemDto,
          lineItem: index + 1,
          createdBy: dto.createdBy,
          projectId: dto.projectId,
          branchId: dto.branchId,
        });

        return itemEntity;
      });
    }

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseQuotationEntity,
    dto: UpdatePurchaseQuotationRequestDto
  ): PurchaseQuotationEntity {
    entity.quotationNumber = dto.quotationNumber;
    entity.quotationType = dto.quotationType;
    entity.requestDate = dto.requestDate;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalCost = dto.totalCost;
    entity.isApproved = dto.isApproved;
    entity.isRequireBidding = dto.isRequireBidding;
    entity.description = dto.description;
    entity.currencyCode = dto.currencyCode;
    entity.documentReference = dto.documentReference;
    entity.status = dto.status;
    entity.updatedBy = dto.updatedBy;

    // Update Foreign Key Relations
    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendor = { id: dto.vendorId } as any;
    }

    if (dto.requestedById) {
      entity.requestedByUser = { id: dto.requestedById } as any;
    }

    // Update Items (1-to-Many Relationship)
    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto) => {
        let itemEntity: PurchaseQuotationItemEntity | null = null;

        // If the item has an ID, update it
        if (itemDto.id) {
          itemEntity = PurchaseQuotationItemMapper.toUpdateEntity(
            new PurchaseQuotationItemEntity({ id: itemDto.id }),
            { ...itemDto, updatedBy: dto.updatedBy }
          );
        } else {
          // Otherwise, create a new item
          itemEntity = PurchaseQuotationItemMapper.toCreateEntity(itemDto);
        }

        itemEntity.quotation = entity; // ✅ Ensure quotation reference is set
        return itemEntity;
      });
    }

    return entity;
  }
}
