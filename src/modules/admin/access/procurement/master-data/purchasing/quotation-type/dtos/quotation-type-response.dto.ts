import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrderTypeResponseDto } from "../../purchase-order-type/dtos";

export class QuotationTypeResponseDto {
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
  defaultPOTypeId: number;

  @ApiProperty()
  defaultPOType: PurchaseOrderTypeResponseDto;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
