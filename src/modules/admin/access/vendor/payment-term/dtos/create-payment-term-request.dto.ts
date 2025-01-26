import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentTermRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  daysDue: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(160)
  description: string;

  
  
  createdBy: string;
}
