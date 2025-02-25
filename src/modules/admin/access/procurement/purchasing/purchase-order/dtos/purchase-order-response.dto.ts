import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';
import { BranchResponseDto } from '@modules/admin/access/branch/dtos';
import { AnalysisCodeResponseDto } from '@modules/admin/access/construction/master-data/analysis-code/dtos';
import { VendorResponseDto } from '@modules/admin/access/vendor/vendor/dtos';
import { PurchaseOrderTypeResponseDto } from '../../../master-data/purchasing/purchase-order-type/dtos';
import { PurchaseOrderItemResponseDto } from './purchase-order-item-response.dto';

export class PurchaseOrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  poNumber: string;

  @ApiProperty()
  poTypeId: number;

  @ApiProperty()
  poType: PurchaseOrderTypeResponseDto;

  @ApiProperty()
  branchId: number;
  
  @ApiProperty()
  branch: BranchResponseDto;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  project: AnalysisCodeResponseDto;

  @ApiProperty()
  vendorId: number;

  @ApiProperty()
  vendor: VendorResponseDto;

  @ApiProperty()
  vendorName?: string;

  @ApiProperty()
  poDate: Date;

  @ApiProperty()
  promisedDate: Date;

  @ApiProperty()
  documentRef?: string;

  @ApiProperty()
  secondRef?: string;

  @ApiProperty()
  poRef?: string;

  @ApiProperty()
  totalQty?: number;

  @ApiProperty()
  openQty?: number;

  @ApiProperty()
  receiptQty?: number;

  @ApiProperty()
  netAmount?: number;

  @ApiProperty()
  totalDiscount?: number;

  @ApiProperty()
  totalAmount?: number;

  @ApiProperty()
  currencyCode: string;

  @ApiProperty()
  priority?: string;

  @ApiProperty()
  attachements?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  isApproved?: boolean;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  updatedByUser: UserResponseDto;

  @ApiProperty({ type: [PurchaseOrderItemResponseDto] })
  items: PurchaseOrderItemResponseDto[];
}
