import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class VendorBank {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  bankId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  benifitsaryName: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  countryCode: string;

  createdBy: string;
}
