import { PurchaseRequestEntity } from './purchase-request.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreatePurchaseRequestRequestDto,
  UpdatePurchaseRequestRequestDto,
  PurchaseRequestResponseDto,
} from './dtos';
import { PurchaseRequestItemMapper } from './purchase-request-item.mapper';
import { BranchMapper } from '@modules/admin/access/branch/branch.mapper';
import { AnalysisCodeMapper } from '@modules/admin/access/construction/master-data/analysis-code/analysis-code.mapper';
import { DepartmentMapper } from '@modules/admin/access/department/department.mapper';
import { RequestTypeMapper } from '../../master-data/purchasing/request-type/request-type.mapper';
import { PurchaseRequestItemEntity } from './purchase-request-item.entity';

export class PurchaseRequestMapper {
  public static async toDto(entity: PurchaseRequestEntity): Promise<PurchaseRequestResponseDto> {
    const dto = new PurchaseRequestResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.requestNumber = entity.requestNumber;
    dto.requestDate = entity.requestDate;
    dto.requiredDate = entity.requiredDate;
    dto.totalQty = entity.totalQty ? parseFloat(entity.totalQty as any) : null;
    dto.openQty = entity.openQty ? parseFloat(entity.openQty as any) : null;
    dto.receiptQty = entity.receiptQty ? parseFloat(entity.receiptQty as any) : null;
    dto.totalCost = entity.totalCost ? parseFloat(entity.totalCost as any) : null;
    dto.totalEstimatedPrice = entity.totalEstimatedPrice ? parseFloat(entity.totalEstimatedPrice as any) : null;
    dto.requestedBy = entity.requestedBy;
    dto.priority = entity.priority;
    dto.currencyCode = entity.currencyCode;
    dto.status = entity.status;
    dto.description = entity.description;
    dto.isApproved = entity.isApproved;

    if (entity.requestType) {
      dto.requestType = await RequestTypeMapper.toDto(entity.requestType);
    }
    if (entity.branch) {
      dto.branch = await BranchMapper.toDto(entity.branch);
    }
    if (entity.project) {
      dto.project = await AnalysisCodeMapper.toDto(entity.project);
    }
    if (entity.department) {
      dto.department = await DepartmentMapper.toDto(entity.department);
    }

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }
    // Map Items (1-to-Many Relationship)
    if (entity.items && entity.items.length > 0) {
      dto.items = await Promise.all(
        entity.items.map((item) => PurchaseRequestItemMapper.toDto(item))
      );
    }

    return dto;
  }

  public static toCreateEntity(dto: CreatePurchaseRequestRequestDto): PurchaseRequestEntity {
    const entity = new PurchaseRequestEntity();
    // default fields?
    entity.active = true;
    entity.requestNumber = dto.requestNumber;
    entity.requestDate = dto.requestDate;
    entity.requiredDate = dto.requiredDate;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalCost = dto.totalCost;
    entity.totalEstimatedPrice = dto.totalEstimatedPrice;
    entity.priority = dto.priority;
    entity.currencyCode = dto.currencyCode;
    entity.status = dto.status;
    entity.description = dto.description;
    entity.isApproved = dto.isApproved;

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.departmentId) {
      entity.department = { id: dto.departmentId } as any;
    }
    if (dto.requestTypeId) {
      entity.requestType = { id: dto.requestTypeId } as any;
    }

    if (dto.requestedBy) {
      entity.requestedByUser = { id: dto.requestedBy } as any;
    }
    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto, index) => {
        const itemEntity = PurchaseRequestItemMapper.toCreateEntity({
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
    entity: PurchaseRequestEntity,
    dto: UpdatePurchaseRequestRequestDto,
  ): PurchaseRequestEntity {
    entity.requestNumber = dto.requestNumber;
    entity.requestDate = dto.requestDate;
    entity.requiredDate = dto.requiredDate;
    entity.totalQty = dto.totalQty;
    entity.openQty = dto.openQty;
    entity.receiptQty = dto.receiptQty;
    entity.totalCost = dto.totalCost;
    entity.totalEstimatedPrice = dto.totalEstimatedPrice;
    entity.requestedBy = dto.requestedBy;
    entity.priority = dto.priority;
    entity.currencyCode = dto.currencyCode;
    entity.status = dto.status;
    entity.description = dto.description;
    entity.isApproved = dto.isApproved;

    if (dto.branchId) {
      entity.branch = { id: dto.branchId } as any;
    }

    if (dto.projectId) {
      entity.project = { id: dto.projectId } as any;
    }

    if (dto.departmentId) {
      entity.department = { id: dto.departmentId } as any;
    }
    if (dto.requestTypeId) {
      entity.requestType = { id: dto.requestTypeId } as any;
    }

    if (dto.requestedBy) {
      entity.requestedByUser = { id: dto.requestedBy } as any;
    }

    if (dto.items && dto.items.length > 0) {
      entity.items = dto.items.map((itemDto) => {
        let itemEntity: PurchaseRequestItemEntity | null = null;

        // If the item has an ID, update it
        if (itemDto.id) {
          itemEntity = PurchaseRequestItemMapper.toUpdateEntity(
            new PurchaseRequestItemEntity({ id: itemDto.id }),
            { ...itemDto, updatedBy: dto.updatedBy }
          );
        } else {
          // Otherwise, create a new item
          itemEntity = PurchaseRequestItemMapper.toCreateEntity(itemDto);
        }

        itemEntity.purchaseRequest = entity; // ✅ Ensure quotation reference is set
        return itemEntity;
      });
    }
    

    return entity;
  }
}
