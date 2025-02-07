import { IsNotEmpty, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModuleStatus } from '@common/enums/status.enum';

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
  @IsOptional()
  sex: string;

  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty()
  @IsOptional()
  maritalStatus: string;

  @ApiProperty()
  @IsOptional()
  nationality: string;

  @ApiProperty()
  @IsOptional()
  religion: string;

  @ApiProperty()
  @IsOptional()
  companyCardNo: string;

  @ApiProperty()
  @IsOptional()
  identityId: string;

  @ApiProperty()
  @IsOptional()
  phone1: string;

  @ApiProperty()
  @IsOptional()
  phone2: string;

  @ApiProperty()
  @IsOptional()
  workingEmail: string;

  @ApiProperty()
  @IsOptional()
  personalEmail: string;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  hiredDate: Date;

  @ApiProperty()
  @IsOptional()
  permanentAddress: string;

  @ApiProperty()
  @IsOptional()
  currenAddress: string;

  @ApiProperty()
  @IsOptional()
  profileImage: string;

  @ApiProperty()
  @IsOptional()
  signatureImage: string;

  @ApiProperty({
    enum: ModuleStatus
  })
  @IsNotEmpty()
  @IsEnum(ModuleStatus)
  status: ModuleStatus
  
  createdBy: string;
}
