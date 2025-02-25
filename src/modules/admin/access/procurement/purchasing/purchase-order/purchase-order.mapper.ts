import { PurchaseOrderEntity } from './purchase-order.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseOrderRequestDto,
  UpdatePurchaseOrderRequestDto,
  PurchaseOrderResponseDto,
} from './dtos';
import { PurchaseOrderTypeMapper } from '../../master-data/purchasing/purchase-order-type/purchase-order-type.mapper';
import { BranchMapper } from '@modules/admin/access/branch/branch.mapper';
import { AnalysisCodeMapper } from '@modules/admin/access/construction/master-data/analysis-code/analysis-code.mapper';
import { VendorMapper } from '@modules/admin/access/vendor/vendor/vendor.mapper';
import { PurchaseOrderItemMapper } from './purchase-order-item.mapper';
import { PurchaseOrderItemEntity } from './purchase-order-item.entity';

export class PurchaseOrderMapper {
  public static async toDto(entity: PurchaseOrderEntity): Promise<PurchaseOrderResponseDto> {
    const dto = new PurchaseOrderResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.poNumber = entity.poNumber;
    dto.vendorName = entity.vendorName;
    dto.poDate = entity.poDate;
    dto.promisedDate = entity.promisedDate;
    dto.documentRef = entity.documentRef;
    dto.secondRef = entity.secondRef;
    dto.poRef = entity.poRef;
    dto.totalQty = entity.totalQty ? parseFloat(entity.totalQty as any) : null;
    dto.openQty = entity.openQty ? parseFloat(entity.openQty as any) : null;
    dto.receiptQty = entity.receiptQty ? parseFloat(entity.receiptQty as any) : null;
    dto.netAmount = entity.netAmount ? parseFloat(entity.netAmount as any) : null;
    dto.totalDiscount = entity.totalDiscount? parseFloat(entity.totalDiscount as any) : null;
    dto.totalAmount = entity.totalAmount ? parseFloat(entity.totalAmount as any) : null;
    dto.currencyCode = entity.currencyCode;
    dto.priority = entity.priority;
    dto.attachements = entity.attachements;
    dto.description = entity.description;
    dto.isApproved = entity.isApproved;
    dto.status = entity.status;
    

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }
    if (entity.updatedByUser) {
      dto.updatedByUser = await UserMapper.toDto(entity.updatedByUser);
    }
    if (entity.poType) {
      dto.poType = await PurchaseOrderTypeMapper.toDto(entity.poType);
    }
    if (entity.branch) {
      dto.branch = await BranchMapper.toDto(entity.branch);
    }
    if (entity.project) {
      dto.project = await AnalysisCodeMapper.toDto(entity.project);
    }
    if (entity.vendor) {
      dto.vendor = await VendorMapper.toDto(entity.vendor);
    }

    // Map Items (1-to-Many Relationship)
    if (entity.items && entity.items.length > 0) {
      dto.items = await Promise.all(
        entity.items.map((item) => PurchaseOrderItemMapper.toDto(item))
      );
    }
    return dto;
  }

  public static toCreateEntity(dto: CreatePurchaseOrderRequestDto): PurchaseOrderEntity {
    const entity = new PurchaseOrderEntity();
    // default fields?
    entity.active = true;
    entity.poNumber = dto.poNumber;
    entity.poTypeId = dto.poTypeId;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.vendorId = dto.vendorId;
    entity.vendorName = dto.vendorName;
    entity.poDate = dto.poDate;
    entity.promisedDate = dto.promisedDate;
    entity.documentRef = dto.documentRef;
    entity.secondRef = dto.secondRef;
    entity.poRef = dto.poRef;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.netAmount = dto.netAmount;
    entity.totalDiscount = dto.totalDiscount;
    entity.totalAmount = dto.totalAmount;
    entity.currencyCode = dto.currencyCode;
    entity.priority = dto.priority;
    entity.attachements = dto.attachements;
    entity.description = dto.description;
    entity.isApproved = dto.isApproved;
    entity.status = dto.status;

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendorId = { id: dto.vendorId } as any;
    }
    if (dto.poTypeId) {
      entity.poTypeId = { id: dto.poTypeId } as any;
    }
    
    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto, index) => {
        const itemEntity = PurchaseOrderItemMapper.toCreateEntity({
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
    entity: PurchaseOrderEntity,
    dto: UpdatePurchaseOrderRequestDto,
  ): PurchaseOrderEntity {
    entity.poNumber = dto.poNumber;
    entity.poTypeId = dto.poTypeId;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.vendorId = dto.vendorId;
    entity.vendorName = dto.vendorName;
    entity.poDate = dto.poDate;
    entity.promisedDate = dto.promisedDate;
    entity.documentRef = dto.documentRef;
    entity.secondRef = dto.secondRef;
    entity.poRef = dto.poRef;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.netAmount = dto.netAmount;
    entity.totalDiscount = dto.totalDiscount;
    entity.totalAmount = dto.totalAmount;
    entity.currencyCode = dto.currencyCode;
    entity.priority = dto.priority;
    entity.attachements = dto.attachements;
    entity.description = dto.description;
    entity.isApproved = dto.isApproved;
    entity.status = dto.status;

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendorId = { id: dto.vendorId } as any;
    }
    if (dto.poTypeId) {
      entity.poTypeId = { id: dto.poTypeId } as any;
    }

    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto) => {
        let itemEntity: PurchaseOrderItemEntity | null = null;
        if (itemDto.id) {
          itemEntity = PurchaseOrderItemMapper.toUpdateEntity(
            new PurchaseOrderItemEntity({ id: itemDto.id }),
            { ...itemDto, updatedBy: dto.updatedBy }
          );
        } else {
          itemEntity = PurchaseOrderItemMapper.toCreateEntity(itemDto);
        }

        itemEntity.purchaseOrder = entity;
        return itemEntity;
      });
    }
    return entity;
  }
}
