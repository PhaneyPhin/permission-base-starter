import { CreatePurchaseRequestItemRequestDto } from './create-purchase-request-item-request.dto';
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModuleStatus } from '@common/enums/status.enum';

export class UpdatePurchaseRequestItemRequestDto extends CreatePurchaseRequestItemRequestDto {
  updatedBy: string;
}
