import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";

export class RequestTypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  numberRank: string;

  @ApiProperty()
  approvalFlow: string;

  @ApiProperty()
  defaultQuotation: string;

  @ApiProperty()
  isRequireApproval: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
