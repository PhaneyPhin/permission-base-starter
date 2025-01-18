import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterPlanRequestDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  unitCode: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  project: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  block: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  building: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  street: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  unitNumber: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  division: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  unitType: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  landSize: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  unitSize: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  description: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  boq: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  startBuildDate: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  endBuildDate: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  actualFinishDate: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  completedPercentage: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  duration: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  standardCost: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  actualCost: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  unearnAccount: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  note: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  isHandover: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  createdAt: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  updatedAt: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  updatedBy: string;

  createdBy: string;
}
