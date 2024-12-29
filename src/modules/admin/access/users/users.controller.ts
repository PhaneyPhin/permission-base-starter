import { ValidationPipe, ParseUUIDPipe, Controller, UseGuards, Param, Post, Body, Get, Put, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ChangePasswordRequestDto, CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto } from './dtos';
import { ApiConflictResponse, ApiBearerAuth, ApiOperation, ApiQuery, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CurrentUser, Permissions, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { USER_FILTER_FIELD, UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Response } from 'express';

@ApiTags('Users')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/users',
  version: '1',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ description: 'Get a paginated user list' })
  @ApiPaginatedResponse(UserResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: 'admin',})
  @ApiFields(USER_FILTER_FIELD)
  @Permissions('admin.access.users.read', 'admin.access.users.create', 'admin.access.users.update')
  @Get()
  public getUsers(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<UserResponseDto>> {
    return this.usersService.list<UserEntity, UserResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all user list form select form' })  
  @Permissions('admin.access.users.read', 'admin.access.users.create', 'admin.access.users.update')
  @Get('/select-options')
  public getAllUserForSelect(): Promise<{ id: string, name: string }[]> {
    return this.usersService.getAllUser();
  }

  @ApiOperation({ description: 'Create new user' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiGlobalResponse(UserResponseDto)
  @Permissions('admin.access.users.create')
  @Post()
  public createUser(@Body() UserDto: CreateUserRequestDto, @CurrentUser() user: UserEntity): Promise<UserResponseDto> {
    UserDto.createdBy = user
    return this.usersService.createUser(UserDto);
  }

  @ApiOperation({ description: 'Update user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @Permissions('admin.access.users.update')
  @Put('/:id')
  public updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) UserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, UserDto);
  }

  @ApiOperation({ description: 'Change user password' })
  @ApiGlobalResponse(UserResponseDto)
  @Post('/change/password')
  changePassword(
    @Body(ValidationPipe) changePassword: ChangePasswordRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<UserResponseDto> {
    return this.usersService.changePassword(changePassword, user.id);
  }

  @ApiOperation({ summary: 'Export all users to Excel' })
  // @ApiResponse({ status: 200, description: 'Excel file containing user data' })
  @Permissions('admin.access.users.export')
  @Get('/export')
  async exportUsers(@Res() res: Response) { 
      const fileBuffer = await this.usersService.exportToExcel();
      // Set headers for the Excel file download
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Send the file buffer as the response
      res.send(fileBuffer);
   }

  @ApiOperation({ summary: 'Import users from Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Users imported successfully' })
  @ApiConflictResponse({ description: 'User already exists' })
  @Permissions('admin.access.users.import')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/import')
  async importUsers(@UploadedFile() file: Multer.File, @CurrentUser() currentUser) {
    const createdUsernames = await this.usersService.importFromExcel(file.buffer, currentUser);
    return { message: 'Users imported successfully', createdUsernames };
  }
  
  @ApiOperation({ description: 'Get user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @Permissions('admin.access.users.read', 'admin.access.users.create', 'admin.access.users.update')
  @Get('/:id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }
}
