import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePurchaseReceiptItemRequestDto {
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
  projectId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lineItem: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  itemCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  itemName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  percentageDiscount?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  netAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount?: number;

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
  @IsString()
  note: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costCenter?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unitCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documentRef?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lineDocumentRef?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondRef?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
