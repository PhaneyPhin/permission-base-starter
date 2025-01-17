import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseRequestDto {
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
  @IsNotEmpty()
  @MaxLength(160)
  description: string;

  createdBy: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @MaxLength(160)
  // contactPhone: string;

  
}
