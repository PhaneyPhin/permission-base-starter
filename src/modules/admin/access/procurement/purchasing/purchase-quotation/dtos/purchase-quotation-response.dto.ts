import { UserResponseDto } from "@admin/access/users/dtos";
import { BranchResponseDto } from "@modules/admin/access/branch/dtos";
import { AnalysisCodeResponseDto } from "@modules/admin/access/construction/master-data/analysis-code/dtos";
import { VendorResponseDto } from "@modules/admin/access/vendor/vendor/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { PurchaseQuotationItemResponseDto } from "./purchase-quotation-item-response.dto";

export class PurchaseQuotationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quotationNumber: string;

  @ApiProperty()
  quotationType: string;

  @ApiProperty({ type: BranchResponseDto })
  branch: BranchResponseDto;

  @ApiProperty({ type: AnalysisCodeResponseDto })
  project: AnalysisCodeResponseDto;

  @ApiProperty()
  requestDate: Date;

  @ApiProperty({ type: UserResponseDto })
  requestedBy: UserResponseDto;

  @ApiProperty()
  totalQty: number;

  @ApiProperty()
  openQty: number;

  @ApiProperty()
  receiptQty: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  isRequireBidding: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: VendorResponseDto })
  vendor: VendorResponseDto;

  @ApiProperty()
  currencyCode: string;

  @ApiProperty()
  documentReference: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ type: UserResponseDto })
  createdByUser: UserResponseDto;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty({ type: UserResponseDto })
  updatedByUser: UserResponseDto;

  @ApiProperty({ type: [PurchaseQuotationItemResponseDto] })
  items: PurchaseQuotationItemResponseDto[];
}
