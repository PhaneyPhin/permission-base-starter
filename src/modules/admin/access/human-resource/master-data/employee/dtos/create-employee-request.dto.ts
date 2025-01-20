import { IsNotEmpty, MaxLength, IsEnum, IsEmail, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../gender.enum';

export class CreateEmployeeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  employeeCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  lastName: string;

  @ApiProperty({
    enum: Gender
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  dateOfBirth: Date;

  @ApiProperty()
  @IsOptional() 
  @Matches(/^0[1-9][0-9]{7,8}$/, { message: 'Invalid Cambodian phone number' })
  contactNumber: string;

  @ApiProperty()
  @IsOptional() 
  @IsEmail({}, { message: 'Invalid email address' })
  emailAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty()
  @IsNotEmpty()
  positionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  hireDate: Date;

  @ApiProperty()
  @MaxLength(160)
  remark: string;

  
  
  createdBy: string;
}
