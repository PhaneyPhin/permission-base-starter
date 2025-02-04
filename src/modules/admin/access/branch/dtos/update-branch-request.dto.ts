import { CreateBranchRequestDto } from './create-branch-request.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBranchRequestDto extends CreateBranchRequestDto {
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
  contactPerson: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('KH')
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  addressEn: string;

  @ApiProperty()
  @IsOptional()
  addressKh: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
