import { CreateWarehouseRequestDto } from './create-warehouse-request.dto';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWarehouseRequestDto extends CreateWarehouseRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  branch_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
