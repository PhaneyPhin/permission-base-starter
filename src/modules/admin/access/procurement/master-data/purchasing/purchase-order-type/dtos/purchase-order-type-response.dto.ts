import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { PurchaseReceiptTypeResponseDto } from "../../purchase-receipt-type/dtos";

export class PurchaseOrderTypeResponseDto {
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
  defaultPRTypeId: number;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  defaultPRType: PurchaseReceiptTypeResponseDto;
}
