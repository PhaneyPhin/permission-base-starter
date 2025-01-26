import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class VendorBankResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  vendorId: string;

  @ApiProperty()
  bankId: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  accountHolderName: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
