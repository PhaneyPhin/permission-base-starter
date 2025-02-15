import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateRequestTypeRequestDto {
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
  numberRank: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  approvalFlow: string;

  @ApiProperty()
  @IsOptional()
  defaultQuotationId: number;

  @ApiProperty()
  @IsOptional()
  isRequireApproval: boolean;

  @ApiProperty()
  @IsOptional()
  @MaxLength(160)
  codePrefix: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  createdBy: string;
}
