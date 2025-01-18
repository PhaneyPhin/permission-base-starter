import { UserResponseDto } from '@admin/access/users/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { DimensionResponseDto } from '../../dimension/dtos';

export class AnalysisCodeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dimensionId: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto

  @ApiProperty()
  dimension: DimensionResponseDto
}
