import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';
import { BranchResponseDto } from '@modules/admin/access/branch/dtos';
import { DepartmentResponseDto } from '@modules/admin/access/department/dtos';
import { StaffStatus } from '../enams/staff-status.enum';
import { EmployeePositionResponseDto } from '../../master-data/employee-position/dtos';

export class StaffProfileResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  staffCode: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  maritalStatus: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  religion: string;

  @ApiProperty()
  companyCardNo: string;

  @ApiProperty()
  identityId: string;

  @ApiProperty()
  phone1: string;

  @ApiProperty()
  phone2: string;

  @ApiProperty()
  workingEmail: string;

  @ApiProperty()
  personalEmail: string;

  @ApiProperty()
  placeOfBirth: string;

  @ApiProperty()
  branch: BranchResponseDto;

  @ApiProperty()
  department: DepartmentResponseDto;

  @ApiProperty()
  position: EmployeePositionResponseDto;

  @ApiProperty()
  hiredDate: Date;

  @ApiProperty()
  permanentAddress: string;

  @ApiProperty()
  currenAddress: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty()
  signatureImage: string;

  @ApiProperty()
  status: StaffStatus;

  @ApiProperty()
  createdByUser: UserResponseDto
}
