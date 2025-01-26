import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorBankRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  vendorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  bankId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  accountHolderName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  currency: string;

  
  
  createdBy: string;
}
