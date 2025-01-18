import { CreateMasterPlanRequestDto } from './create-master-plan-request.dto';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMasterPlanRequestDto extends CreateMasterPlanRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  project: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  block: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  building: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  division: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitType: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  landSize: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitSize: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  boq: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  startBuildDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  endBuildDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  actualFinishDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  completedPercentage: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  duration: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  standardCost: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  actualCost: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unearnAccount: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  note: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  isHandover: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  createdAt: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  updatedAt: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  updatedBy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
