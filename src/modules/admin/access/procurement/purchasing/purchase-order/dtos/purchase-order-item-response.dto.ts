import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class PurchaseOrderItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  poId: number | null;

  @ApiProperty()
  branchId: number | null;

  @ApiProperty()
  projectId: number | null;

  @ApiProperty()
  lineItem: number | null;

  @ApiProperty()
  itemCode: string | null;

  @ApiProperty()
  itemName: string | null;

  @ApiProperty()
  unit: string | null;

  @ApiProperty()
  itemType: string | null;

  @ApiProperty()
  quantity: number | null;

  @ApiProperty()
  unitPrice: number | null;

  @ApiProperty()
  discount: number | null;

  @ApiProperty()
  percentageDiscount: number | null;

  @ApiProperty()
  netAmount: number | null;

  @ApiProperty()
  amount: number | null;

  @ApiProperty()
  openQuantity: number | null;

  @ApiProperty()
  receiptQuantity: number | null;

  @ApiProperty()
  note: string | null;

  @ApiProperty()
  costCenter: number | null;

  @ApiProperty()
  requestDate: Date | null;

  @ApiProperty()
  promisedDate: Date | null;

  @ApiProperty()
  unitCode: string | null;

  @ApiProperty()
  status: string | null;

  @ApiProperty()
  documentRef: string | null;

  @ApiProperty()
  lineDocumentRef: string | null;

  @ApiProperty()
  secondRef: string | null;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto | null;

  @ApiProperty()
  updatedByUser: UserResponseDto | null;
}
