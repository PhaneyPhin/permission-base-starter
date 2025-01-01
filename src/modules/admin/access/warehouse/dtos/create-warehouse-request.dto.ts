import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  branch: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  description: string;

  createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  contactPhone: string;

  
}
