import { IsNotEmpty, IsBoolean, IsOptional, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePurchaseOrderItemRequestDto } from './create-purchase-order-item-request.dto';
import { Type } from 'class-transformer';

export class CreatePurchaseOrderRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  poNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  poTypeId: number;

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
  poDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  promisedDate: Date;

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
  priority: string;

  @ApiProperty()
  @IsOptional()
  attachements: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  createdBy: string;

  // Validate items array
  @ApiProperty({ type: [CreatePurchaseOrderItemRequestDto] })
  @ValidateNested({ each: true }) // Validate each item
  @Type(() => CreatePurchaseOrderItemRequestDto) // Transform each item into the correct DTO type
  @ArrayMinSize(1) // Ensure at least 1 item is provided
  items: CreatePurchaseOrderItemRequestDto[];
}
