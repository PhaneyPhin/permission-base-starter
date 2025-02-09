import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MaxLength } from "class-validator";
import { CreateVendorBankRequestDto } from "./create-vendor-bank-request.dto";

export class UpdateVendorBankRequestDto extends CreateVendorBankRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  vendorId: number;

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
  benifitsaryName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
