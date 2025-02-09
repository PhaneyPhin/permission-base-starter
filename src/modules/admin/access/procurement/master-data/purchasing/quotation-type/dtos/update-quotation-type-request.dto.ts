import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, MaxLength } from "class-validator";
import { CreateQuotationTypeRequestDto } from "./create-quotation-type-request.dto";

export class UpdateQuotationTypeRequestDto extends CreateQuotationTypeRequestDto {
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
  @IsBoolean()
  active: boolean;

  updatedBy: string;
}
