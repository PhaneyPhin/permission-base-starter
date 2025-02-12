import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class UpdateRequestTypeRequestDto {
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
  defaultQuotation: number;

  @ApiProperty()
  @IsOptional()
  isRequireApproval: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;
}
