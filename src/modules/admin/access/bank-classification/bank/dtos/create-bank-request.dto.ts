import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateBankRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  countryCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  address: string;

  createdBy: string;
}
