import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';
import { CategoryResponseDto } from '../../master-data/category/dtos';
import { UomResponseDto } from '../../master-data/uom/dtos';
import { ItemGroupResponseDto } from '../../master-data/item-group/dtos';
import { ValuationMethodResponseDto } from '../../master-data/valuation-method/dtos';
import { ItemType } from '../item-type-enum';
import { ModuleStatus } from '@common/enums/status.enum';

export class ItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  itemGroup: ItemGroupResponseDto;

  @ApiProperty()
  category: CategoryResponseDto;

  @ApiProperty()
  uom: UomResponseDto;

  @ApiProperty()
  valuationMethod: ValuationMethodResponseDto;

  @ApiProperty()
  itemType: ItemType;

  @ApiProperty()
  minStock: number;

  @ApiProperty()
  standardCost: number;

  @ApiProperty()
  unitCost: number;

  @ApiProperty()
  itemImage: string;

  @ApiProperty()
  itemImageUrl: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  status: ModuleStatus;

  @ApiProperty()
  createdByUser: UserResponseDto

  @ApiProperty()
  updatedByUser: UserResponseDto
}
