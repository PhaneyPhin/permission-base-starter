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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { NATIONALITY_FILTER_FIELDS, NationalityService } from './nationality.service';
import {
  CreateNationalityRequestDto,
  UpdateNationalityRequestDto,
  NationalityResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { NationalityEntity } from './nationality.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Nationality')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/nationality',
  version: '1',
})
export class NationalityController {
  constructor(private readonly nationalityService: NationalityService) {}

  @ApiOperation({ description: 'Get a paginated nationality list' })
  @ApiPaginatedResponse(NationalityResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(NATIONALITY_FILTER_FIELDS)
  @Permissions(
    'admin.access.nationality.read',
    'admin.access.nationality.create',
    'admin.access.nationality.update',
  )
  @Get()
  public getNationalitys(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<NationalityResponseDto>> {
    return this.nationalityService.list<NationalityEntity, NationalityResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all nationality list form select form' })  
  @Permissions(
    'admin.access.nationality.read',
    'admin.access.nationality.create',
    'admin.access.nationality.update',
  )
  @Get('/select-options')
  public async  getAllNationalityForSelect() {
    return await this.nationalityService.getAllNationality();
  }

  @ApiOperation({ description: 'Get nationality by id' })
  @ApiGlobalResponse(NationalityResponseDto)
  @Permissions(
    'admin.access.nationality.read',
    'admin.access.nationality.create',
    'admin.access.nationality.update',
  )
  @Get('/:id')
  public getNationalityById(@Param('id', ParseIntPipe) id: number): Promise<NationalityResponseDto> {
    return this.nationalityService.getNationalityById(id);
  }

  @ApiOperation({ description: 'Create new nationality' })
  @ApiGlobalResponse(NationalityResponseDto)
  @ApiConflictResponse({ description: 'Nationality already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.nationality.create')
  @Post()
  public createNationality(
    @Body(ValidationPipe) dto: CreateNationalityRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<NationalityResponseDto> {
    return this.nationalityService.createNationality({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update nationality by id' })
  @ApiGlobalResponse(NationalityResponseDto)
  @ApiConflictResponse({ description: 'Nationality already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.nationality.update')
  @Put('/:id')
  public updateNationality(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateNationalityRequestDto,
  ): Promise<NationalityResponseDto> {
    return this.nationalityService.updateNationality(id, dto);
  }

  @ApiOperation({ description: 'Update nationality by id' })
  @ApiGlobalResponse(NationalityResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.nationality.delete')
  @Delete('/:id')
  public deleteNationality(
    @Param('id', ParseIntPipe) id: number
  ): Promise<NationalityResponseDto> {
    return this.nationalityService.deleteNationality(id);
  }
}
