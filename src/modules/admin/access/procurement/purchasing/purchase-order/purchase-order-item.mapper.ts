import { PurchaseOrderItemEntity } from './purchase-order-item.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseOrderItemRequestDto,
  UpdatePurchaseOrderItemRequestDto,
  PurchaseOrderItemResponseDto,
} from './dtos';

export class PurchaseOrderItemMapper {
  public static async toDto(entity: PurchaseOrderItemEntity): Promise<PurchaseOrderItemResponseDto> {
    const dto = new PurchaseOrderItemResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.poId = entity.poId;
    dto.branchId = entity.branchId;
    dto.projectId = entity.projectId;
    dto.lineItem = entity.lineItem;
    dto.itemCode = entity.itemCode;
    dto.itemName = entity.itemName;
    dto.unit = entity.unit;
    dto.itemType = entity.itemType;
    dto.quantity = entity.quantity;
    dto.unitPrice = entity.unitPrice;
    dto.discount = entity.discount;
    dto.percentageDiscount = entity.percentageDiscount;
    dto.netAmount = entity.netAmount;
    dto.amount = entity.amount;
    dto.openQuantity = entity.openQuantity;
    dto.receiptQuantity = entity.receiptQuantity;
    dto.note = entity.note;
    dto.costCenter = entity.costCenter;
    dto.requestDate = entity.requestDate;
    dto.promisedDate = entity.promisedDate;
    dto.unitCode = entity.unitCode;
    dto.status = entity.status;
    dto.documentRef = entity.documentRef;
    dto.lineDocumentRef = entity.lineDocumentRef;
    dto.secondRef = entity.secondRef;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreatePurchaseOrderItemRequestDto): PurchaseOrderItemEntity {
    const entity = new PurchaseOrderItemEntity();
    // default fields?
    entity.active = true;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unit = dto.unit;
    entity.itemType = dto.itemType;
    entity.quantity = dto.quantity;
    entity.unitPrice = dto.unitPrice;
    entity.discount = dto.discount;
    entity.percentageDiscount = dto.percentageDiscount;
    entity.netAmount = dto.netAmount;
    entity.amount = dto.amount;
    entity.openQuantity = dto.openQuantity;
    entity.receiptQuantity = dto.receiptQuantity;
    entity.note = dto.note;
    entity.costCenter = dto.costCenter;
    entity.requestDate = dto.requestDate;
    entity.promisedDate = dto.promisedDate;
    entity.unitCode = dto.unitCode;
    entity.status = dto.status;
    entity.documentRef = dto.documentRef;
    entity.lineDocumentRef = dto.lineDocumentRef;
    entity.secondRef = dto.secondRef;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseOrderItemEntity,
    dto: UpdatePurchaseOrderItemRequestDto,
  ): PurchaseOrderItemEntity {
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unit = dto.unit;
    entity.itemType = dto.itemType;
    entity.quantity = dto.quantity;
    entity.unitPrice = dto.unitPrice;
    entity.discount = dto.discount;
    entity.percentageDiscount = dto.percentageDiscount;
    entity.netAmount = dto.netAmount;
    entity.amount = dto.amount;
    entity.openQuantity = dto.openQuantity;
    entity.receiptQuantity = dto.receiptQuantity;
    entity.note = dto.note;
    entity.costCenter = dto.costCenter;
    entity.requestDate = dto.requestDate;
    entity.promisedDate = dto.promisedDate;
    entity.unitCode = dto.unitCode;
    entity.status = dto.status;
    entity.documentRef = dto.documentRef;
    entity.lineDocumentRef = dto.lineDocumentRef;
    entity.secondRef = dto.secondRef;
    

    return entity;
  }
}
