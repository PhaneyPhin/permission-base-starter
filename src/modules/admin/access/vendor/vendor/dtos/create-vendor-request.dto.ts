import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from "class-validator";
import { Attachment } from "./attachment.dto";
import { VendorBank } from "./vendor-bank.dto";

export class CreateVendorRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsOptional()
  status: string;

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
  vendorTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  vendorClassId: number;

  @ApiProperty()
  @IsOptional()
  paymentTermId: number;

  @ApiProperty()
  @IsOptional()
  paymentMethodId: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(10)
  title: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  contactPerson: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  phone1: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  phone2: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({ ignore_max_length: true })
  workingEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({ ignore_max_length: true })
  email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attachments: Attachment[];

  @ApiProperty()
  @ArrayMinSize(1)
  @IsArray()
  vendorBanks: VendorBank[];

  createdBy: string;
}
