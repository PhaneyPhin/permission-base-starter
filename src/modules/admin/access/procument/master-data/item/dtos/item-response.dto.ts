import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';
import { CategoryResponseDto } from '../../category/dtos';
import { UomResponseDto } from '../../uom/dtos';

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
  category: CategoryResponseDto;

  @ApiProperty()
  uom: UomResponseDto;

  @ApiProperty()
  description: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
