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

import { PURCHASE_REQUEST_FILTER_FIELDS, PurchaseRequestService } from './purchase-request.service';
import {
  CreatePurchaseRequestRequestDto,
  UpdatePurchaseRequestRequestDto,
  PurchaseRequestResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { PurchaseRequestEntity } from './purchase-request.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('PurchaseRequest')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/purchase-request',
  version: '1',
})
export class PurchaseRequestController {
  constructor(private readonly purchaseRequestService: PurchaseRequestService) {}

  @ApiOperation({ description: 'Get a paginated purchase-request list' })
  @ApiPaginatedResponse(PurchaseRequestResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(PURCHASE_REQUEST_FILTER_FIELDS)
  @Permissions(
    'admin.access.purchase-request.read',
    'admin.access.purchase-request.create',
    'admin.access.purchase-request.update',
  )
  @Get()
  public getPurchaseRequests(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<PurchaseRequestResponseDto>> {
    return this.purchaseRequestService.list<PurchaseRequestEntity, PurchaseRequestResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all purchase-request list form select form' })  
  @Permissions(
    'admin.access.purchase-request.read',
    'admin.access.purchase-request.create',
    'admin.access.purchase-request.update',
  )
  @Get("/select-options")
  public getAllPurchaseRequestForSelect(): Promise<any[]> {
    return this.purchaseRequestService.getAllPurchaseRequest();
  }

  @ApiOperation({ description: 'Get purchase-request by id' })
  @ApiGlobalResponse(PurchaseRequestResponseDto)
  @Permissions(
    'admin.access.purchase-request.read',
    'admin.access.purchase-request.create',
    'admin.access.purchase-request.update',
  )
  @Get('/:id')
  public getPurchaseRequestById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PurchaseRequestResponseDto> {
    return this.purchaseRequestService.getPurchaseRequestById(id);
  }

  @ApiOperation({ description: 'Create new purchase-request' })
  @ApiGlobalResponse(PurchaseRequestResponseDto)
  @ApiConflictResponse({ description: 'PurchaseRequest already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-request.create')
  @Post()
  public createPurchaseRequest(
    @Body(ValidationPipe) dto: CreatePurchaseRequestRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PurchaseRequestResponseDto> {
    return this.purchaseRequestService.createPurchaseRequest({ 
      ...dto,  
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: 'Update purchase-request by id' })
  @ApiGlobalResponse(PurchaseRequestResponseDto)
  @ApiConflictResponse({ description: 'PurchaseRequest already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-request.update')
  @Put('/:id')
  public updatePurchaseRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseRequestRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PurchaseRequestResponseDto> {
    return this.purchaseRequestService.updatePurchaseRequest(id, { 
      ...dto, 
      updatedBy: user.id 
    });
  }

  @ApiOperation({ description: 'Delete purchase-request by id' })
  @ApiGlobalResponse(PurchaseRequestResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.purchase-request.delete')
  @Delete('/:id')
  public deletePurchaseRequest(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PurchaseRequestResponseDto> {
    return this.purchaseRequestService.deletePurchaseRequest(id);
  }
}
