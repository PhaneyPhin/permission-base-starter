import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";

export class VendorBankResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  vendorId?: number;

  @ApiProperty()
  bankId: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  benifitsaryName: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  countryCode: string;
}
