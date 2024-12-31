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

import { WarehouseService } from './warehouse.service';
import {
  CreateWarehouseRequestDto,
  UpdateWarehouseRequestDto,
  WarehouseResponseDto,
} from './dtos';

import { Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { WarehouseEntity } from './warehouse.entity';

@ApiTags('Warehouse')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/warehouse',
  version: '1',
})
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiOperation({ description: 'Get a paginated warehouse list' })
  @ApiPaginatedResponse(WarehouseResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(['name'])
  @Permissions(
    'admin.access.warehouse.read',
    'admin.access.warehouse.create',
    'admin.access.warehouse.update',
  )
  @Get()
  public getWarehouses(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<WarehouseResponseDto>> {
    return this.warehouseService.list<WarehouseEntity, WarehouseResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all warehouse list form select form' })  
  @Permissions(
    'admin.access.warehouse.read',
    'admin.access.warehouse.create',
    'admin.access.warehouse.update',
  )
  @Get('/select-options')
  public getAllWarehouseForSelect(): Promise<{ id: string, name: string }[]> {
    return this.warehouseService.getAllWarehouse();
  }

  @ApiOperation({ description: 'Get warehouse by id' })
  @ApiGlobalResponse(WarehouseResponseDto)
  @Permissions(
    'admin.access.warehouse.read',
    'admin.access.warehouse.create',
    'admin.access.warehouse.update',
  )
  @Get('/:id')
  public getWarehouseById(@Param('id', ParseIntPipe) id: number): Promise<WarehouseResponseDto> {
    return this.warehouseService.getWarehouseById(id);
  }

  @ApiOperation({ description: 'Create new warehouse' })
  @ApiGlobalResponse(WarehouseResponseDto)
  @ApiConflictResponse({ description: 'Warehouse already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.warehouse.create')
  @Post()
  public createWarehouse(
    @Body(ValidationPipe) dto: CreateWarehouseRequestDto,
  ): Promise<WarehouseResponseDto> {
    return this.warehouseService.createWarehouse(dto);
  }

  @ApiOperation({ description: 'Update warehouse by id' })
  @ApiGlobalResponse(WarehouseResponseDto)
  @ApiConflictResponse({ description: 'Warehouse already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.warehouse.update')
  @Put('/:id')
  public updateWarehouse(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateWarehouseRequestDto,
  ): Promise<WarehouseResponseDto> {
    return this.warehouseService.updateWarehouse(id, dto);
  }

  @ApiOperation({ description: 'Update warehouse by id' })
  @ApiGlobalResponse(WarehouseResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.warehouse.delete')
  @Delete('/:id')
  public deleteWarehouse(
    @Param('id', ParseIntPipe) id: number
  ): Promise<WarehouseResponseDto> {
    return this.warehouseService.deleteWarehouse(id);
  }
}
