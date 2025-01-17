import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dtos';
import { BranchResponseDto } from '../../branch/dtos';

export class WarehouseResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  branch: BranchResponseDto;

  @ApiProperty()
  code: string;
  
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

  @ApiProperty()
  createdAt: Date;
}
