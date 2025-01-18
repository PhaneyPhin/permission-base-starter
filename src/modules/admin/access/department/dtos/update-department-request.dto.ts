import { CreateDepartmentRequestDto } from './create-department-request.dto';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentRequestDto extends CreateDepartmentRequestDto {

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
  @IsOptional()
  @MaxLength(160)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
