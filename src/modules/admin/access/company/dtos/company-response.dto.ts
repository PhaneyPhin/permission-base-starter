import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@admin/access/users/dtos';

export class CompanyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  addressEn: string;

  @ApiProperty()
  addressKh: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  logoUrl: string;

  @ApiProperty()
  active: boolean;
  
  @ApiProperty()
  createdByUser: UserResponseDto
}
