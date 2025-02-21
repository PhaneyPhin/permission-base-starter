import { PurchaseRequestItemEntity } from '../purchase-request/purchase-request-item.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseRequestItemRequestDto,
  UpdatePurchaseRequestItemRequestDto,
  PurchaseRequestItemResponseDto,
} from './dtos';

export class PurchaseRequestItemMapper {
  public static async toDto(entity: PurchaseRequestItemEntity): Promise<PurchaseRequestItemResponseDto> {
    const dto = new PurchaseRequestItemResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.purchaseRequestId = entity.purchaseRequestId;
    dto.branchId = entity.branchId;
    dto.projectId = entity.projectId;
    dto.actualDate = entity.actualDate;
    dto.lineItem = entity.lineItem;
    dto.itemCode = entity.itemCode;
    dto.itemName = entity.itemName;
    dto.unitId = entity.unitId;
    dto.quantity = entity.quantity ? parseFloat(entity.quantity as any) : null;
    dto.estimationPrice = entity.estimationPrice ? parseFloat(entity.estimationPrice as any) : null;
    dto.openQty = entity.openQty ? parseFloat(entity.openQty as any) : null;
    dto.receiptQty = entity.receiptQty ? parseFloat(entity.receiptQty as any) : null;
    dto.totalEstimatePrice = entity.totalEstimatePrice ? parseFloat(entity.totalEstimatePrice as any) : null;
    dto.costCenter = entity.costCenter;
    dto.unitCode = entity.unitCode;
    dto.note = entity.note;
    dto.status = entity.status;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreatePurchaseRequestItemRequestDto): PurchaseRequestItemEntity {
    const entity = new PurchaseRequestItemEntity();
    // default fields?
    entity.active = true;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.actualDate = dto.actualDate;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unitId = dto.unitId;
    entity.quantity = dto.quantity;
    entity.estimationPrice = dto.estimationPrice;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalEstimatePrice = dto.totalEstimatePrice;
    entity.costCenter = dto.costCenter;
    entity.unitCode = dto.unitCode;
    entity.note = dto.note;
    entity.status = dto.status;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: PurchaseRequestItemEntity,
    dto: UpdatePurchaseRequestItemRequestDto,
  ): PurchaseRequestItemEntity {
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.actualDate = dto.actualDate;
    entity.lineItem = dto.lineItem;
    entity.itemCode = dto.itemCode;
    entity.itemName = dto.itemName;
    entity.unitId = dto.unitId;
    entity.quantity = dto.quantity;
    entity.estimationPrice = dto.estimationPrice;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalEstimatePrice = dto.totalEstimatePrice;
    entity.costCenter = dto.costCenter;
    entity.unitCode = dto.unitCode;
    entity.note = dto.note;
    entity.status = dto.status;
    

    return entity;
  }
}
