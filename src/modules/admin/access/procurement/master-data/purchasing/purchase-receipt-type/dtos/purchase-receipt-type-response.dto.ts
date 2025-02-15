import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";

export class PurchaseReceiptTypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  codePrefix: string;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
