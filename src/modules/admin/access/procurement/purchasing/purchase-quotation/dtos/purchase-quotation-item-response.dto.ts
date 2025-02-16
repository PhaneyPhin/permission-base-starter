import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";

export class PurchaseQuotationItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quotationId: string;

  @ApiProperty()
  branchId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty({ required: false })
  warehouseId?: number;

  @ApiProperty({ required: false })
  documentRef?: string;

  @ApiProperty({ required: false })
  lineDocumentRef?: string;

  @ApiProperty()
  actualDate: Date;

  @ApiProperty()
  lineItem: number;

  @ApiProperty()
  itemCode: string;

  @ApiProperty()
  itemName: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ required: false })
  estimatePrice?: number;

  @ApiProperty({ required: false })
  openQuantity?: number;

  @ApiProperty({ required: false })
  receiptQuantity?: number;

  @ApiProperty({ required: false })
  totalEstimatePrice?: number;

  @ApiProperty({ required: false })
  note?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  vendorId: number;

  @ApiProperty()
  currencyCode: string;

  @ApiProperty({ required: false })
  isApproved?: boolean;

  @ApiProperty({ required: false })
  isRequireBidding?: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
