import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { QuotationTypeResponseDto } from "../../quotation-type/dtos";

export class RequestTypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  numberRank: string;

  @ApiProperty()
  approvalFlow: string;

  @ApiProperty()
  defaultQuotationId: number;

  @ApiProperty()
  defaultQuotation: QuotationTypeResponseDto;

  @ApiProperty()
  isRequireApproval: boolean;

  @ApiProperty()
  codePrefix: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
