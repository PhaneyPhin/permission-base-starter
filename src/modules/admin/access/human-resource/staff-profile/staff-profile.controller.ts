import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { STAFF_PROFILE_FILTER_FIELDS, StaffProfileService } from './staff-profile.service';
import {
  CreateStaffProfileRequestDto,
  UpdateStaffProfileRequestDto,
  StaffProfileResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { StaffProfileEntity } from './staff-profile.entity';
import { UserEntity } from '@admin/access/users/user.entity';
import { StaffProfileMapper } from './staff-profile.mapper';
import { StaffStatus } from './enams/staff-status.enum';
import { UpdateStatusDto } from './dtos/update-active-status-request-dto';

@ApiTags('StaffProfile')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/staff-profile',
  version: '1',
})
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}

  @ApiOperation({ description: 'Get a paginated staff-profile list' })
  @ApiPaginatedResponse(StaffProfileResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(STAFF_PROFILE_FILTER_FIELDS)
  @Permissions(
    'admin.access.staff-profile.read',
    'admin.access.staff-profile.create',
    'admin.access.staff-profile.update',
  )
  @Get()
  public getStaffProfiles(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<StaffProfileResponseDto>> {
    return this.staffProfileService.list<StaffProfileEntity, StaffProfileResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all staff-profile list form select form' })  
  @Permissions(
    'admin.access.staff-profile.read',
    'admin.access.staff-profile.create',
    'admin.access.staff-profile.update',
  )
  @Get('/select-options')
  public getAllStaffProfileForSelect(){
    return this.staffProfileService.getAllStaffProfile();
  }

  @ApiOperation({ description: 'Get staff-profile by id' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @Permissions(
    'admin.access.staff-profile.read',
    'admin.access.staff-profile.create',
    'admin.access.staff-profile.update',
  )
  @Get('/:id')
  public getStaffProfileById(@Param('id', ParseIntPipe) id: number): Promise<StaffProfileResponseDto> {
    return this.staffProfileService.getStaffProfileById(id);
  }

  @ApiOperation({ description: 'Create new staff-profile' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @ApiConflictResponse({ description: 'StaffProfile already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.staff-profile.create')
  @Post()
  public createStaffProfile(
    @Body(ValidationPipe) dto: CreateStaffProfileRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<StaffProfileResponseDto> {
    return this.staffProfileService.createStaffProfile({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update staff-profile by id' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @ApiConflictResponse({ description: 'StaffProfile already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.staff-profile.update')
  @Put('/:id')
  public updateStaffProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateStaffProfileRequestDto,
  ): Promise<StaffProfileResponseDto> {
    return this.staffProfileService.updateStaffProfile(id, dto);
  }

  @ApiOperation({ description: 'Update staff-profile by id' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.staff-profile.delete')
  @Delete('/:id')
  public deleteStaffProfile(
    @Param('id', ParseIntPipe) id: number
  ): Promise<StaffProfileResponseDto> {
    return this.staffProfileService.deleteStaffProfile(id);
  }

  @ApiOperation({ description: 'Activate multiple staff profiles' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.staff-profile.update-status')
  @Patch('/active')
  public async activateStaffProfiles(
    @Body(ValidationPipe) dto: UpdateStatusDto,
  ): Promise<{ message: string; updatedIds: number[]; status: StaffStatus }> {
    const updatedIds = await this.staffProfileService.activateStaffProfiles(dto.ids);
    return StaffProfileMapper.toBulkUpdateResponse(updatedIds, StaffStatus.ACTIVE);
  }
  
  @ApiOperation({ description: 'Deactivate multiple staff profiles' })
  @ApiGlobalResponse(StaffProfileResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.staff-profile.update-status')
  @Patch('/deactivate')
  public async deactivateStaffProfiles(
    @Body(ValidationPipe) dto: UpdateStatusDto,
  ): Promise<{ message: string; updatedIds: number[]; status: StaffStatus }> {
    const updatedIds = await this.staffProfileService.deactivateStaffProfiles(dto.ids);
    return StaffProfileMapper.toBulkUpdateResponse(updatedIds, StaffStatus.INACTIVE);
  }  
}
