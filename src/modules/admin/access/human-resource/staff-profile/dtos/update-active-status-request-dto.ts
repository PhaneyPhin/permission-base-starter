import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { StaffStatus } from '../enams/staff-status.enum';

export class UpdateStatusDto {
  @ApiProperty({ description: 'List of staff profile IDs to update', example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  ids: number[];

  @ApiProperty({ description: 'The status to set', example: StaffStatus.ACTIVE })
  @IsNotEmpty()
  @IsEnum(StaffStatus)
  status: StaffStatus;
}

