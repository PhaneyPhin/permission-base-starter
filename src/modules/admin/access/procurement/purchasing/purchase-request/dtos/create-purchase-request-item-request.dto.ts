import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePurchaseRequestItemRequestDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  actualDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsNumber()
  unitId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  estimationPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  openQty?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  receiptQty?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalEstimatePrice?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costCenter?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unitCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
