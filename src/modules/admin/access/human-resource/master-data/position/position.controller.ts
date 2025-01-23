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

import { POSITION_FILTER_FIELDS, PositionService } from './position.service';
import {
  CreatePositionRequestDto,
  UpdatePositionRequestDto,
  PositionResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { PositionEntity } from './position.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Position')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/position',
  version: '1',
})
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiOperation({ description: 'Get a paginated position list' })
  @ApiPaginatedResponse(PositionResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(POSITION_FILTER_FIELDS)
  @Permissions(
    'admin.access.position.read',
    'admin.access.position.create',
    'admin.access.position.update',
  )
  @Get()
  public getPositions(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<PositionResponseDto>> {
    return this.positionService.list<PositionEntity, PositionResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all position list form select form' })  
  @Permissions(
    'admin.access.position.read',
    'admin.access.position.create',
    'admin.access.position.update',
  )
  @Get('/select-options')
  public async  getAllPositionForSelect() {
    return await this.positionService.getAllPosition();
  }

  @ApiOperation({ description: 'Get position by id' })
  @ApiGlobalResponse(PositionResponseDto)
  @Permissions(
    'admin.access.position.read',
    'admin.access.position.create',
    'admin.access.position.update',
  )
  @Get('/:id')
  public getPositionById(@Param('id', ParseIntPipe) id: number): Promise<PositionResponseDto> {
    return this.positionService.getPositionById(id);
  }

  @ApiOperation({ description: 'Create new position' })
  @ApiGlobalResponse(PositionResponseDto)
  @ApiConflictResponse({ description: 'Position already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.position.create')
  @Post()
  public createPosition(
    @Body(ValidationPipe) dto: CreatePositionRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PositionResponseDto> {
    return this.positionService.createPosition({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update position by id' })
  @ApiGlobalResponse(PositionResponseDto)
  @ApiConflictResponse({ description: 'Position already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.position.update')
  @Put('/:id')
  public updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePositionRequestDto,
  ): Promise<PositionResponseDto> {
    return this.positionService.updatePosition(id, dto);
  }

  @ApiOperation({ description: 'Update position by id' })
  @ApiGlobalResponse(PositionResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.position.delete')
  @Delete('/:id')
  public deletePosition(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PositionResponseDto> {
    return this.positionService.deletePosition(id);
  }
}
