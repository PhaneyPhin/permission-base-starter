import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { CreatePurchaseReceiptItemRequestDto } from "./create-purchase-receipt-item-request.dto";

export class CreatePurchaseReceiptRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  receiptNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vendorId: number;

  @ApiProperty()
  @IsOptional()
  vendorName: string;

  @ApiProperty()
  @IsNotEmpty()
  receiptDate: Date;

  @ApiProperty()
  @IsOptional()
  postingPeriod: string;

  @ApiProperty()
  @IsOptional()
  documentRef: string;

  @ApiProperty()
  @IsOptional()
  secondRef: string;

  @ApiProperty()
  @IsOptional()
  poRef: string;

  @ApiProperty()
  @IsOptional()
  billingDate: Date;

  @ApiProperty()
  @IsOptional()
  totalPercentageDiscount: number;

  @ApiProperty()
  @IsOptional()
  paymentTermId: number;

  @ApiProperty()
  @IsOptional()
  receiptRef: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalQty: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  openQty: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  receiptQty: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  netAmount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalDiscount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  currencyCode: string;

  @ApiProperty()
  @IsOptional()
  attachements: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  createdBy: string;

  // Validate items array
  @ApiProperty({ type: [CreatePurchaseReceiptItemRequestDto] })
  @ValidateNested({ each: true }) // Validate each item
  @Type(() => CreatePurchaseReceiptItemRequestDto) // Transform each item into the correct DTO type
  @ArrayMinSize(1) // Ensure at least 1 item is provided
  items: CreatePurchaseReceiptItemRequestDto[];
}
