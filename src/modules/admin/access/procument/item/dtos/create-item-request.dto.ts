import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../status-enum';
import { ItemType } from '../item-type-enum';

export class CreateItemRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  nameKh: string;

  @ApiProperty()
  @IsNotEmpty()
  itemGroupId: number;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  uomId: number;

  @ApiProperty()
  @IsNotEmpty()
  valuationMethodId: number;

  @ApiProperty({
    enum: ItemType
  })
  @IsNotEmpty()
  @IsEnum(ItemType)
  itemType: ItemType

  @ApiProperty()
  @IsOptional()
  minStock: number;

  @ApiProperty()
  @IsOptional()
  standardCost: number;

  @ApiProperty()
  @IsOptional()
  unitCost: number;

  @ApiProperty()
  @IsOptional()
  itemImage: string;

  @ApiProperty()
  @IsOptional()
  note: string;

  @ApiProperty({
    enum: Status
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status
  
  createdBy: string;
}
