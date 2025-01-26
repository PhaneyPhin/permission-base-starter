import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class UpdateActiveStatusIdsDto {
  @ApiProperty({ description: 'List of staff profile IDs to update', example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  ids: number[];
}
