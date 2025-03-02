import { UserResponseDto } from "@admin/access/users/dtos";
import { PaymentTermResponseDto } from "@modules/admin/access/bank-classification/payment-term/dtos";
import { BranchResponseDto } from "@modules/admin/access/branch/dtos";
import { AnalysisCodeResponseDto } from "@modules/admin/access/construction/master-data/analysis-code/dtos";
import { VendorResponseDto } from "@modules/admin/access/vendor/vendor/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PurchaseReceiptTypeResponseDto } from "../../../master-data/purchasing/purchase-receipt-type/dtos";
import { PurchaseReceiptItemResponseDto } from "./purchase-receipt-item-response.dto";

export class PurchaseReceiptResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  receiptNumber: string;

  @ApiProperty()
  prTypeId: number;

  @ApiProperty()
  poType: PurchaseReceiptTypeResponseDto;

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
  receiptDate: Date;

  @ApiProperty()
  postingPeriod: string;

  @ApiProperty()
  documentRef?: string;

  @ApiProperty()
  secondRef?: string;

  @ApiProperty()
  poRef?: string;

  @ApiProperty()
  @IsOptional()
  billingDate: Date;

  @ApiProperty()
  totalPercentageDiscount: number;

  @ApiProperty()
  paymentTerm: PaymentTermResponseDto;

  @ApiProperty()
  receiptRef?: number;

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
  attachements?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  updatedByUser: UserResponseDto;

  @ApiProperty({ type: [PurchaseReceiptItemResponseDto] })
  items: PurchaseReceiptItemResponseDto[];
}
