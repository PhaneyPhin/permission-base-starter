import { CreateItemGroupRequestDto } from './create-item-group-request.dto';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemGroupRequestDto extends CreateItemGroupRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty()
  @MaxLength(160)
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isStockItem: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  isNonStockItem: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
