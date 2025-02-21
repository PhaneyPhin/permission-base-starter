import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemGroupRequestDto {
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

  @ApiProperty()
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isStockItem: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  isNonStockItem: boolean;

  
  
  createdBy: string;
}
