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

import { PURCHASE_ORDER_FILTER_FIELDS, PurchaseOrderService } from './purchase-order.service';
import {
  CreatePurchaseOrderRequestDto,
  UpdatePurchaseOrderRequestDto,
  PurchaseOrderResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('PurchaseOrder')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/purchase-order',
  version: '1',
})
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @ApiOperation({ description: 'Get a paginated purchase-order list' })
  @ApiPaginatedResponse(PurchaseOrderResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(PURCHASE_ORDER_FILTER_FIELDS)
  @Permissions(
    'admin.access.purchase-order.read',
    'admin.access.purchase-order.create',
    'admin.access.purchase-order.update',
  )
  @Get()
  public getPurchaseOrders(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<PurchaseOrderResponseDto>> {
    return this.purchaseOrderService.list<PurchaseOrderEntity, PurchaseOrderResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all purchase-order list form select form' })  
  @Permissions(
    'admin.access.purchase-order.read',
    'admin.access.purchase-order.create',
    'admin.access.purchase-order.update',
  )
  @Get('/select-options')
  public getAllPurchaseOrderForSelect(): Promise<any[]> {
    return this.purchaseOrderService.getAllPurchaseOrder();
  }

  @ApiOperation({ description: 'Get purchase-order by id' })
  @ApiGlobalResponse(PurchaseOrderResponseDto)
  @Permissions(
    'admin.access.purchase-order.read',
    'admin.access.purchase-order.create',
    'admin.access.purchase-order.update',
  )
  @Get('/:id')
  public getPurchaseOrderById(@Param('id', ParseIntPipe) id: number): Promise<PurchaseOrderResponseDto> {
    return this.purchaseOrderService.getPurchaseOrderById(id);
  }

  @ApiOperation({ description: 'Create new purchase-order' })
  @ApiGlobalResponse(PurchaseOrderResponseDto)
  @ApiConflictResponse({ description: 'PurchaseOrder already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-order.create')
  @Post()
  public createPurchaseOrder(
    @Body(ValidationPipe) dto: CreatePurchaseOrderRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PurchaseOrderResponseDto> {
    return this.purchaseOrderService.createPurchaseOrder({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update purchase-order by id' })
  @ApiGlobalResponse(PurchaseOrderResponseDto)
  @ApiConflictResponse({ description: 'PurchaseOrder already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-order.update')
  @Put('/:id')
  public updatePurchaseOrder(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseOrderRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseOrderResponseDto> {
    return this.purchaseOrderService.updatePurchaseOrder(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: 'Update purchase-order by id' })
  @ApiGlobalResponse(PurchaseOrderResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-order.delete')
  @Delete('/:id')
  public deletePurchaseOrder(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PurchaseOrderResponseDto> {
    return this.purchaseOrderService.deletePurchaseOrder(id);
  }
}
