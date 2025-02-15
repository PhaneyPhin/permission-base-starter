import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class UpdatePurchaseOrderTypeRequestDto {
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

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  codePrefix: string;

  updatedBy: string;

  @ApiProperty()
  @IsOptional()
  defaultPRTypeId: number;
}
