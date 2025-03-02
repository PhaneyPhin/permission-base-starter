import { UserMapper } from "@admin/access/users/users.mapper";
import { PaymentTermEntity } from "@modules/admin/access/bank-classification/payment-term/payment-term.entity";
import { PaymentTermMapper } from "@modules/admin/access/bank-classification/payment-term/payment-term.mapper";
import { BranchMapper } from "@modules/admin/access/branch/branch.mapper";
import { AnalysisCodeMapper } from "@modules/admin/access/construction/master-data/analysis-code/analysis-code.mapper";
import { VendorMapper } from "@modules/admin/access/vendor/vendor/vendor.mapper";
import { PurchaseReceiptTypeMapper } from "../../master-data/purchasing/purchase-receipt-type/purchase-receipt-type.mapper";
import {
  CreatePurchaseReceiptRequestDto,
  PurchaseReceiptResponseDto,
  UpdatePurchaseReceiptRequestDto,
} from "./dtos";
import { PurchaseReceiptItemEntity } from "./purchase-receipt-item.entity";
import { PurchaseReceiptItemMapper } from "./purchase-receipt-item.mapper";
import { PurchaseReceiptEntity } from "./purchase-receipt.entity";

export class PurchaseReceiptMapper {
  public static async toDto(
    entity: PurchaseReceiptEntity
  ): Promise<PurchaseReceiptResponseDto> {
    const dto = new PurchaseReceiptResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.receiptNumber = entity.receiptNumber;
    dto.vendorName = entity.vendorName;
    dto.receiptDate = entity.receiptDate;
    dto.documentRef = entity.documentRef;
    dto.postingPeriod = entity.postingPeriod;
    dto.secondRef = entity.secondRef;
    dto.poRef = entity.poRef;
    dto.billingDate = entity.billingDate;

    dto.totalPercentageDiscount = entity.totalPercentageDiscount;
    dto.receiptRef = entity.receiptRef;
    dto.totalQty = entity.totalQty ? parseFloat(entity.totalQty as any) : null;
    dto.openQty = entity.openQty ? parseFloat(entity.openQty as any) : null;
    dto.receiptQty = entity.receiptQty
      ? parseFloat(entity.receiptQty as any)
      : null;
    dto.netAmount = entity.netAmount
      ? parseFloat(entity.netAmount as any)
      : null;
    dto.totalDiscount = entity.totalDiscount
      ? parseFloat(entity.totalDiscount as any)
      : null;
    dto.totalAmount = entity.totalAmount
      ? parseFloat(entity.totalAmount as any)
      : null;
    dto.currencyCode = entity.currencyCode;
    dto.attachements = entity.attachements;
    dto.description = entity.description;
    dto.status = entity.status;

    if (entity.paymentTerm) {
      dto.paymentTerm = await PaymentTermMapper.toDto(entity.paymentTerm);
    }
    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }
    if (entity.updatedByUser) {
      dto.updatedByUser = await UserMapper.toDto(entity.updatedByUser);
    }
    if (entity.poType) {
      dto.poType = await PurchaseReceiptTypeMapper.toDto(entity.poType);
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
        entity.items.map((item) => PurchaseReceiptItemMapper.toDto(item))
      );
    }
    return dto;
  }

  public static toCreateEntity(
    dto: CreatePurchaseReceiptRequestDto
  ): PurchaseReceiptEntity {
    const entity = new PurchaseReceiptEntity();
    // default fields?
    entity.active = true;
    entity.receiptNumber = dto.receiptNumber;
    entity.prTypeId = dto.prTypeId;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.vendorId = dto.vendorId;
    entity.vendorName = dto.vendorName;
    entity.receiptDate = dto.receiptDate;
    entity.documentRef = dto.documentRef;
    entity.secondRef = dto.secondRef;
    entity.poRef = dto.poRef;
    entity.billingDate = dto.billingDate;
    dto.totalPercentageDiscount = entity.totalPercentageDiscount;
    entity.receiptRef = dto.receiptRef;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.netAmount = dto.netAmount;
    entity.totalDiscount = dto.totalDiscount;
    entity.totalAmount = dto.totalAmount;
    entity.currencyCode = dto.currencyCode;
    entity.attachements = dto.attachements;
    entity.description = dto.description;
    entity.status = dto.status;

    if (dto.paymentTermId) {
      entity.paymentTerm = new PaymentTermEntity({ id: dto.paymentTermId });
    }

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendorId = { id: dto.vendorId } as any;
    }
    if (dto.prTypeId) {
      entity.prTypeId = { id: dto.prTypeId } as any;
    }

    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto, index) => {
        const itemEntity = PurchaseReceiptItemMapper.toCreateEntity({
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
    entity: PurchaseReceiptEntity,
    dto: UpdatePurchaseReceiptRequestDto
  ): PurchaseReceiptEntity {
    entity.receiptNumber = dto.receiptNumber;
    entity.prTypeId = dto.prTypeId;
    entity.branchId = dto.branchId;
    entity.projectId = dto.projectId;
    entity.vendorId = dto.vendorId;
    entity.vendorName = dto.vendorName;
    entity.receiptDate = dto.receiptDate;
    entity.postingPeriod = dto.postingPeriod;
    entity.documentRef = dto.documentRef;
    entity.postingPeriod = dto.postingPeriod;
    entity.secondRef = dto.secondRef;
    entity.poRef = dto.poRef;
    entity.billingDate = dto.billingDate;
    entity.totalPercentageDiscount = dto.totalPercentageDiscount;
    entity.receiptRef = dto.receiptRef;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.netAmount = dto.netAmount;
    entity.totalDiscount = dto.totalDiscount;
    entity.totalAmount = dto.totalAmount;
    entity.currencyCode = dto.currencyCode;
    entity.attachements = dto.attachements;
    entity.description = dto.description;
    entity.status = dto.status;

    if (dto.paymentTermId) {
      entity.paymentTerm = new PaymentTermEntity({ id: dto.paymentTermId });
    }

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.vendorId) {
      entity.vendorId = { id: dto.vendorId } as any;
    }
    if (dto.prTypeId) {
      entity.prTypeId = { id: dto.prTypeId } as any;
    }

    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto) => {
        let itemEntity: PurchaseReceiptItemEntity | null = null;
        if (itemDto.id) {
          itemEntity = PurchaseReceiptItemMapper.toUpdateEntity(
            new PurchaseReceiptItemEntity({ id: itemDto.id }),
            { ...itemDto, updatedBy: dto.updatedBy }
          );
        } else {
          itemEntity = PurchaseReceiptItemMapper.toCreateEntity(itemDto);
        }

        itemEntity.purchaseReceipt = entity;
        return itemEntity;
      });
    }
    return entity;
  }
}
