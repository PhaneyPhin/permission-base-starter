import { CreateBranchRequestDto } from './create-branch-request.dto';
import { IsBoolean, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';
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
  @IsNotEmpty()
  @MaxLength(160)
  contactPerson: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  @IsPhoneNumber('KH')
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
  @IsNotEmpty()
  @MaxLength(160)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
