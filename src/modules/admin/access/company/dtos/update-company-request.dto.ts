import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { CreateCompanyRequestDto } from './create-company-request.dto';

export class UpdateCompanyRequestDto extends CreateCompanyRequestDto {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  @MaxLength(160)
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
