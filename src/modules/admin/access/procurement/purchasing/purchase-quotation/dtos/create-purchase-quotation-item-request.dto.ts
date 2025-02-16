import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from "class-validator";

export class CreatePurchaseQuotationItemRequestDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  branchId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  projectId?: number;

  @ApiProperty()
  @IsOptional()
  warehouseId?: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  documentRef?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  lineDocumentRef?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  actualDate?: Date;

  @ApiProperty()
  @IsOptional()
  lineItem: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  itemCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  itemName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  estimatePrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  openQuantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  receiptQuantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalEstimatePrice?: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  note?: string;

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
  currencyCode?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  status?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  createdBy?: string;
}
