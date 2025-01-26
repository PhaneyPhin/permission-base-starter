import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';
import { ItemGroupResponseDto } from '../../item-group/dtos';

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  parentId: number;

  @ApiProperty()
  parent: CategoryResponseDto;

  @ApiProperty()
  itemGroup: ItemGroupResponseDto;

  @ApiProperty()
  description: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
