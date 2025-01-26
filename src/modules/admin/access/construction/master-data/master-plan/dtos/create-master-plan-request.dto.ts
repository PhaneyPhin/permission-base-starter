import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from "class-validator";
import { MasterPlanStatus } from "../enums/master-plan-status.enum";

export class CreateMasterPlanRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  unitCode: string;

  @ApiProperty()
  @IsEnum(MasterPlanStatus, {
    message: "Status must be one of the defined enum values",
  })
  @IsOptional() // Makes the field optional
  @Transform(({ value }) => value || MasterPlanStatus.OPEN) // Default to `OPEN` if no value is provided
  status: MasterPlanStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  project: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  block: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  building: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  street: number;

  @ApiProperty()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  division: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitType: number;

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
  @IsNotEmpty()
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
  actualFinishDate: Date;

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

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attachments: string[];

  createdBy: string;
}
