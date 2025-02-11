import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class ItemGroupResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isStockItem: boolean;

  @ApiProperty()
  isNonStockItem: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
