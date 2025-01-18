import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { DIMENSION_FILTER_FIELDS, DimensionService } from './dimension.service';
import {
  CreateDimensionRequestDto,
  DimensionResponseDto,
  UpdateDimensionRequestDto,
} from './dtos';

import { UserEntity } from '@admin/access/users/user.entity';
import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { DimensionEntity } from './dimension.entity';

@ApiTags('Dimension')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/construction/master-data/dimension',
  version: '1',
})
export class DimensionController {
  constructor(private readonly dimensionService: DimensionService) {}

  @ApiOperation({ description: 'Get a paginated dimension list' })
  @ApiPaginatedResponse(DimensionResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(DIMENSION_FILTER_FIELDS)
  @Permissions(
    'admin.access.dimension.read',
    'admin.access.dimension.create',
    'admin.access.dimension.update',
  )
  @Get()
  public getDimensions(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<DimensionResponseDto>> {
    return this.dimensionService.list<DimensionEntity, DimensionResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all dimension list form select form' })  
  @Permissions(
    'admin.access.dimension.read',
    'admin.access.dimension.create',
    'admin.access.dimension.update',
  )
  @Get('/select-options')
  public getAllDimensionForSelect(): Promise<DimensionEntity[]> {
    return this.dimensionService.getAllDimension();
  }

  @ApiOperation({ description: 'Get dimension by id' })
  @ApiGlobalResponse(DimensionResponseDto)
  @Permissions(
    'admin.access.dimension.read',
    'admin.access.dimension.create',
    'admin.access.dimension.update',
  )
  @Get('/:id')
  public getDimensionById(@Param('id', ParseIntPipe) id: number): Promise<DimensionResponseDto> {
    return this.dimensionService.getDimensionById(id);
  }

  @ApiOperation({ description: 'Create new dimension' })
  @ApiGlobalResponse(DimensionResponseDto)
  @ApiConflictResponse({ description: 'Dimension already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.dimension.create')
  @Post()
  public createDimension(
    @Body(ValidationPipe) dto: CreateDimensionRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<DimensionResponseDto> {
    return this.dimensionService.createDimension({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update dimension by id' })
  @ApiGlobalResponse(DimensionResponseDto)
  @ApiConflictResponse({ description: 'Dimension already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.dimension.update')
  @Put('/:id')
  public updateDimension(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateDimensionRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<DimensionResponseDto> {
    return this.dimensionService.updateDimension(id, { ...dto, updatedBy: user.id });
  }

  @ApiOperation({ description: 'Update dimension by id' })
  @ApiGlobalResponse(DimensionResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.dimension.delete')
  @Delete('/:id')
  public deleteDimension(
    @Param('id', ParseIntPipe) id: number
  ): Promise<DimensionResponseDto> {
    return this.dimensionService.deleteDimension(id);
  }
}
