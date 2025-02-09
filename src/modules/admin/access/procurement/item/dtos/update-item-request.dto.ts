import { CreateItemRequestDto } from './create-item-request.dto';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from '../item-type-enum';
import { ModuleStatus } from '@common/enums/status.enum';

export class UpdateItemRequestDto extends CreateItemRequestDto {
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
  @IsNumber()
  minStock: number;

  @ApiProperty({
    description: 'Standard cost with up to 15 digits, 2 decimal places',
    example: 1250.50,
    type: 'number',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  standardCost: number;

  @ApiProperty({
    description: 'Unit cost with up to 15 digits, 2 decimal places',
    example: 500.75,
    type: 'number',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  unitCost: number;

  @ApiProperty()
  @IsOptional()
  itemImage: string;

  @ApiProperty()
  @IsOptional()
  note: string;

  @ApiProperty({
    enum: ModuleStatus
  })
  @IsNotEmpty()
  @IsEnum(ModuleStatus)
  status: ModuleStatus
}
