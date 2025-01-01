import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dtos';

export class WarehouseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  branch: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  contactPhone: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
