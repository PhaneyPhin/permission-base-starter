import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

class FileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  size: number;
}

export class Attachment {
  @IsObject()
  file: FileDto;

  @IsString()
  @IsOptional()
  url: string;

  @IsBoolean()
  @IsOptional()
  isImage: boolean;

  @IsString()
  @IsNotEmpty()
  code: string;
}
