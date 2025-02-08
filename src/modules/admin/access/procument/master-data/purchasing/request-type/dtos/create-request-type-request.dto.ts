import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateRequestTypeRequestDto {
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
  @IsNotEmpty()
  isRequireApproval: boolean;

  createdBy: string;
}
