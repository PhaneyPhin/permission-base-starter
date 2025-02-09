import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { CreateRequestTypeRequestDto } from "./create-request-type-request.dto";

export class UpdateRequestTypeRequestDto extends CreateRequestTypeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  numberRank: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  approvalFlow: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  defaultQuotation: string;

  @ApiProperty()
  @IsOptional()
  isRequireApproval: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
