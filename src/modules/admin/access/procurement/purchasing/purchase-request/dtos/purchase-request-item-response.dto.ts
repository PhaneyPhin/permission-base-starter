import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class PurchaseRequestItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  purchaseRequestId: number;

  @ApiProperty()
  branchId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  actualDate?: Date;

  @ApiProperty()
  lineItem: number;

  @ApiProperty()
  itemCode?: string;

  @ApiProperty()
  itemName?: string;

  @ApiProperty()
  unitId: number;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  estimationPrice?: number;

  @ApiProperty()
  openQty?: number;

  @ApiProperty()
  receiptQty?: number;

  @ApiProperty()
  totalEstimatePrice?: number;

  @ApiProperty()
  costCenter?: number;

  @ApiProperty()
  unitCode?: string;

  @ApiProperty()
  note?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}