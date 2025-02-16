import { UserMapper } from "@admin/access/users/users.mapper";
import {
  CreatePurchaseQuotationItemRequestDto,
  PurchaseQuotationItemResponseDto,
  UpdatePurchaseQuotationItemRequestDto,
} from "./dtos";
import { PurchaseQuotationItemEntity } from "./purchase-quotation-item.entity";

export class PurchaseQuotationItemMapper {
  public static async toDto(
    entity: PurchaseQuotationItemEntity
  ): Promise<PurchaseQuotationItemResponseDto> {
    const dto = new PurchaseQuotationItemResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.id = entity.id;
    dto.branchId = entity.branchId;
    dto.projectId = entity.projectId;
    dto.warehouseId = entity.warehouseId;
    dto.documentRef = entity.documentRef;
    dto.lineDocumentRef = entity.lineDocumentRef;
    dto.actualDate = entity.actualDate;
    dto.lineItem = entity.lineItem;
    dto.itemCode = entity.itemCode;
    dto.itemName = entity.itemName;
    dto.unit = entity.unit;
    dto.quantity = entity.quantity;
    dto.estimatePrice = entity.estimatePrice;
    dto.openQuantity = entity.openQuantity;
    dto.receiptQuantity = entity.receiptQuantity;
    dto.totalEstimatePrice = entity.totalEstimatePrice;
    dto.note = entity.note;
    dto.status = entity.status;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreatePurchaseQuotationItemRequestDto
  ): PurchaseQuotationItemEntity {
    const entity = new PurchaseQuotationItemEntity();
    // default fields?
    entity.active = true;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.warehouseId = dto.warehouseId;
    entity.documentRef = dto.documentRef;
    entity.lineDocumentRef = dto.lineDocumentRef;
    entity.actualDate = dto.actualDate;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unit = dto.unit;
    entity.quantity = dto.quantity;
    entity.estimatePrice = dto.estimatePrice;
    entity.openQuantity = dto.openQuantity;
    entity.receiptQuantity = dto.receiptQuantity;
    entity.totalEstimatePrice = dto.totalEstimatePrice;
    entity.note = dto.note;
    entity.status = dto.status;

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseQuotationItemEntity,
    dto: UpdatePurchaseQuotationItemRequestDto
  ): PurchaseQuotationItemEntity {
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.warehouseId = dto.warehouseId;
    entity.documentRef = dto.documentRef;
    entity.lineDocumentRef = dto.lineDocumentRef;
    entity.actualDate = dto.actualDate;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unit = dto.unit;
    entity.quantity = dto.quantity;
    entity.estimatePrice = dto.estimatePrice;
    entity.openQuantity = dto.openQuantity;
    entity.receiptQuantity = dto.receiptQuantity;
    entity.totalEstimatePrice = dto.totalEstimatePrice;
    entity.note = dto.note;
    entity.status = dto.status;

    return entity;
  }
}
