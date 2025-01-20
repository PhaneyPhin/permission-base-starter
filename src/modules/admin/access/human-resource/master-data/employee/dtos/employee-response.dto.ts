import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class EmployeeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  employeeCode: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
   fullName: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  contactNumber: string;

  @ApiProperty()
  emailAddress: string;

  @ApiProperty()
  departmentId: number;

  @ApiProperty()
  positionId: number;

  @ApiProperty()
  hireDate: Date;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
