import { IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enams/gender.enum';
import { Title } from '../enams/title.enum';
import { MaritalStatus } from '../enams/maritalStatus.enum';
import { StaffStatus } from '../enams/staff-status-enum';

export class CreateStaffProfileRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  staffCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty({
    enum: Gender
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  sex: Gender

  @ApiProperty({
    enum: Title
  })
  @IsNotEmpty()
  @IsEnum(Title)
  title: Title

  @ApiProperty()
  @MaxLength(160)
  dateOfBirth: Date;

  @ApiProperty({
    enum: MaritalStatus
  })
  @IsNotEmpty()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus

  @ApiProperty()
  @IsNotEmpty()
  nationalityId: number;

  @ApiProperty()
  @MaxLength(160)
  religion: string;

  @ApiProperty()
  @MaxLength(160)
  companyCardNo: string;

  @ApiProperty()
  @MaxLength(160)
  identityId: string;

  @ApiProperty()
  @MaxLength(160)
  phone1: string;

  @ApiProperty()
  @MaxLength(160)
  phone2: string;

  @ApiProperty()
  @MaxLength(160)
  workingEmail: string;

  @ApiProperty()
  @MaxLength(160)
  personalEmail: string;

  @ApiProperty()
  @MaxLength(160)
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
  @MaxLength(160)
  hiredDate: Date;

  @ApiProperty()
  @MaxLength(160)
  permanentAddress: string;

  @ApiProperty()
  @MaxLength(160)
  currenAddress: string;

  @ApiProperty()
  @MaxLength(160)
  profileImage: string;

  @ApiProperty()
  @MaxLength(160)
  signatureImage: string;

  @ApiProperty({
    enum: StaffStatus
  })
  @IsNotEmpty()
  @IsEnum(StaffStatus)
  status: StaffStatus
  
  createdBy: string;
}
