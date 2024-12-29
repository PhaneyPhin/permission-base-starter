import { ArrayNotEmpty, IsAlphanumeric, IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../user-status.enum';
import { UserEntity } from '../user.entity';
import { UserApproval } from '../user-approval';

export class UpdateUserRequestDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({
    example: 'jdoe',
  })
  username: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: 'John',
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  email: string;

  createdBy: UserEntity

  @ApiProperty({ example: [1, 2] })
  @ArrayNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  roles: number[];
  
  @ApiProperty({
    enum: UserApproval
  })
  @IsNotEmpty()
  @IsEnum(UserApproval)
  userApproval: UserApproval

  @ApiProperty({
    enum: UserStatus
  })
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus
}
