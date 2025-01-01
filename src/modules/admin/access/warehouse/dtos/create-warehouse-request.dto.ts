import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  branch: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  nameKh: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(160)
  contactPhone: string;

  
}
