import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class BranchResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  addressEn: string;

  @ApiProperty()
  addressKh: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdByUser: UserResponseDto
}
