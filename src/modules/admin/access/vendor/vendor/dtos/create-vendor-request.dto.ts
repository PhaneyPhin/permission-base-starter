import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorRequestDto {
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
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  paymentTermId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  paymentMethodId: string;

  
  
  createdBy: string;
}
