import { CreatePurchaseRequestRequestDto } from './create-purchase-request-request.dto';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePurchaseRequestRequestDto extends CreatePurchaseRequestRequestDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  updatedBy: string;
}
