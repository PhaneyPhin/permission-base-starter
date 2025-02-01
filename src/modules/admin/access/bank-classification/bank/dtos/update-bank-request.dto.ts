import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateBankRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  address: string;
}
