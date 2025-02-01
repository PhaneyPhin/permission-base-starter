import { UserResponseDto } from "@admin/access/users/dtos";
import { ApiProperty } from "@nestjs/swagger";

export class BankResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto;
}
