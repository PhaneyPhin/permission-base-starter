import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ description: 'List of staff profile IDs to update', example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  ids: number[];
}



