import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateAnalysisCodeRequestDto } from './create-analysis-code-request.dto';

export class UpdateAnalysisCodeRequestDto extends CreateAnalysisCodeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  dimensionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  updatedBy: string;
}
