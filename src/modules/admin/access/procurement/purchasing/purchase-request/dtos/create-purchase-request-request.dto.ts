import { IsBoolean, IsNotEmpty, IsOptional, IsNumber, IsString, IsDate, ValidateNested, ArrayMinSize, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePurchaseRequestItemRequestDto } from './create-purchase-request-item-request.dto';

export class CreatePurchaseRequestRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requestNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  requestTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

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
  @IsDateString()
  requestDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  requiredDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalQty?: number;

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
  totalCost?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalEstimatedPrice?: number;

  @ApiProperty()
  @IsOptional()
  requestedBy: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currencyCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isApproved: boolean;

  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;

   // Validate items array
    @ApiProperty({ type: [CreatePurchaseRequestItemRequestDto] })
    @ValidateNested({ each: true }) // Validate each item
    @Type(() => CreatePurchaseRequestItemRequestDto) // Transform each item into the correct DTO type
    @ArrayMinSize(1) // Ensure at least 1 item is provided
    items: CreatePurchaseRequestItemRequestDto[];
}