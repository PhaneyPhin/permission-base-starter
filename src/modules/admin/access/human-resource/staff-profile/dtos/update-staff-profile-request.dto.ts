import { CreateStaffProfileRequestDto } from './create-staff-profile-request.dto';
import { IsBoolean, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaritalStatus } from '../enams/maritalStatus.enum';
import { Gender } from '../enams/gender.enum';
import { Title } from '../enams/title.enum';
import { StaffStatus } from '../enams/staff-status.enum';

export class UpdateStaffProfileRequestDto extends CreateStaffProfileRequestDto {
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
  @IsNotEmpty()
  branchId: number;

  @ApiProperty()
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty()
  @IsNotEmpty()
  positionId: number;

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

  @ApiProperty({
    enum: StaffStatus
  })
  @IsNotEmpty()
  @IsEnum(StaffStatus)
  status: StaffStatus

  createdBy: string;
}
