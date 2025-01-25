import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  parentId?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  itemGroupId: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  description: string;

  
  
  createdBy: string;
}
