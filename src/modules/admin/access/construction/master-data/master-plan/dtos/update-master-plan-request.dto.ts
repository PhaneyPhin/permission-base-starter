import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { MasterPlanStatus } from '../enums/master-plan-status.enum';
import { CreateMasterPlanRequestDto } from './create-master-plan-request.dto';

export class UpdateMasterPlanRequestDto extends CreateMasterPlanRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitCode: string;

  @IsEnum(MasterPlanStatus, { message: 'Status must be one of the defined enum values' })
  @IsOptional() // Makes the field optional
  @Transform(({ value }) => value || MasterPlanStatus.OPEN) // Default to `OPEN` if no value is provided
  status: MasterPlanStatus;

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
