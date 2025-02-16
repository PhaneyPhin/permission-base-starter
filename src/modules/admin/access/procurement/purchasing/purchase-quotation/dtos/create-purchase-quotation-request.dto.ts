import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { CreatePurchaseQuotationItemRequestDto } from "./create-purchase-quotation-item-request.dto"; // Import the item DTO

export class CreatePurchaseQuotationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  quotationNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  quotationType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vendorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  requestDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  requestedById: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  openQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  receiptQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalCost: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRequireBidding?: boolean;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  currencyCode: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  documentReference?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  status: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  createdBy?: string;

  // Validate items array
  @ApiProperty({ type: [CreatePurchaseQuotationItemRequestDto] })
  @ValidateNested({ each: true }) // Validate each item
  @Type(() => CreatePurchaseQuotationItemRequestDto) // Transform each item into the correct DTO type
  @ArrayMinSize(1) // Ensure at least 1 item is provided
  items: CreatePurchaseQuotationItemRequestDto[];
}
