import { IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  nameKh: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  contactPerson: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  @IsPhoneNumber("KH")
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  addressEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  addressKh: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  description: string;

  createdBy: string;
}
