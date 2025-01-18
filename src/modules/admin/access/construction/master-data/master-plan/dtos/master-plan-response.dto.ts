import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class MasterPlanResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  unitCode: string;

  @ApiProperty()
  project: string;

  @ApiProperty()
  block: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  unitNumber: string;

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
  actualFinishDate: string;

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
  createdAt: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
