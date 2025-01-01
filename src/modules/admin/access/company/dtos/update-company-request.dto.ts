import { CreateCompanyRequestDto } from './create-company-request.dto';
import { IsBoolean, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyRequestDto extends CreateCompanyRequestDto {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  website: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(400)
  addressEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(400)
  addressKh: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
