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

import { UOM_FILTER_FIELDS, UomService } from './uom.service';
import {
  CreateUomRequestDto,
  UpdateUomRequestDto,
  UomResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { UomEntity } from './uom.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Uom')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/uom',
  version: '1',
})
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @ApiOperation({ description: 'Get a paginated uom list' })
  @ApiPaginatedResponse(UomResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(UOM_FILTER_FIELDS)
  @Permissions(
    'admin.access.uom.read',
    'admin.access.uom.create',
    'admin.access.uom.update',
  )
  @Get()
  public getUoms(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<UomResponseDto>> {
    return this.uomService.list<UomEntity, UomResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all uom list form select form' })  
  @Permissions(
    'admin.access.uom.read',
    'admin.access.uom.create',
    'admin.access.uom.update',
  )
  @Get('/select-options')
  public async  getAllUomForSelect() {
    return await this.uomService.getAllUom();
  }

  @ApiOperation({ description: 'Get uom by id' })
  @ApiGlobalResponse(UomResponseDto)
  @Permissions(
    'admin.access.uom.read',
    'admin.access.uom.create',
    'admin.access.uom.update',
  )
  @Get('/:id')
  public getUomById(@Param('id', ParseIntPipe) id: number): Promise<UomResponseDto> {
    return this.uomService.getUomById(id);
  }

  @ApiOperation({ description: 'Create new uom' })
  @ApiGlobalResponse(UomResponseDto)
  @ApiConflictResponse({ description: 'Uom already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.uom.create')
  @Post()
  public createUom(
    @Body(ValidationPipe) dto: CreateUomRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<UomResponseDto> {
    return this.uomService.createUom({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update uom by id' })
  @ApiGlobalResponse(UomResponseDto)
  @ApiConflictResponse({ description: 'Uom already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.uom.update')
  @Put('/:id')
  public updateUom(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateUomRequestDto,
  ): Promise<UomResponseDto> {
    return this.uomService.updateUom(id, dto);
  }

  @ApiOperation({ description: 'Update uom by id' })
  @ApiGlobalResponse(UomResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.uom.delete')
  @Delete('/:id')
  public deleteUom(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UomResponseDto> {
    return this.uomService.deleteUom(id);
  }
}
