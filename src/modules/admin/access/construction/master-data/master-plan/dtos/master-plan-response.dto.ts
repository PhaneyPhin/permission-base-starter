import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { MasterPlanStatus } from "../enums/master-plan-status.enum";

export class MasterPlanResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  unitNumber: string;

  @ApiProperty()
  status: MasterPlanStatus;

  @ApiProperty()
  project: string;

  @ApiProperty()
  block: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  unitCode: string;

  @ApiProperty()
  division: string;

  @ApiProperty()
  unitType: string;

  @ApiProperty()
  landSize: string;

  @ApiProperty()
  unitSize: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  boq: string;

  @ApiProperty()
  startBuildDate: string;

  @ApiProperty()
  endBuildDate: string;

  @ApiProperty()
  actualFinishDate: Date;

  @ApiProperty()
  completedPercentage: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  standardCost: string;

  @ApiProperty()
  actualCost: string;

  @ApiProperty()
  unearnAccount: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  isHandover: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  updatedByUser: UserResponseDto;

  @ApiProperty()
  attachments: string[];
}
