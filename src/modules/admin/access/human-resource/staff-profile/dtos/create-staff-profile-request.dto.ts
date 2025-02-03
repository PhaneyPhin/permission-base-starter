import { IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StaffStatus } from '../enams/staff-status.enum';

export class CreateStaffProfileRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  staffCode: string;

  @ApiProperty()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  nameKh: string;

  @ApiProperty()
  @IsNotEmpty()
  sex: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  maritalStatus: string;

  @ApiProperty()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  religion: string;

  @ApiProperty()
  @IsNotEmpty()
  companyCardNo: string;

  @ApiProperty()
  @IsNotEmpty()
  identityId: string;

  @ApiProperty()
  @IsNotEmpty()
  phone1: string;

  @ApiProperty()
  @IsNotEmpty()
  phone2: string;

  @ApiProperty()
  @IsNotEmpty()
  workingEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  personalEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  placeOfBirth: string;

  @ApiProperty()
  @IsNotEmpty()
  branchId: number;

  @ApiProperty()
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty()
  @IsNotEmpty()
  positionId: number;

  @ApiProperty()
  @IsNotEmpty()
  hiredDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  permanentAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  currenAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  profileImage: string;

  @ApiProperty()
  @IsNotEmpty()
  signatureImage: string;

  @ApiProperty({
    enum: StaffStatus
  })
  @IsNotEmpty()
  @IsEnum(StaffStatus)
  status: StaffStatus
  
  createdBy: string;
}
