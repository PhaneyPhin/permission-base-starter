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

import { ITEM_FILTER_FIELDS, ItemService } from './item.service';
import {
  CreateItemRequestDto,
  UpdateItemRequestDto,
  ItemResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { ItemEntity } from './item.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Item')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/item',
  version: '1',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ description: 'Get a paginated item list' })
  @ApiPaginatedResponse(ItemResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(ITEM_FILTER_FIELDS)
  @Permissions(
    'admin.access.item.read',
    'admin.access.item.create',
    'admin.access.item.update',
  )
  @Get()
  public getItems(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<ItemResponseDto>> {
    return this.itemService.list<ItemEntity, ItemResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all item list form select form' })  
  @Permissions(
    'admin.access.item.read',
    'admin.access.item.create',
    'admin.access.item.update',
  )
  @Get('/select-options')
  public async  getAllItemForSelect() {
    return await this.itemService.getAllItem();
  }

  @ApiOperation({ description: 'Get item by id' })
  @ApiGlobalResponse(ItemResponseDto)
  @Permissions(
    'admin.access.item.read',
    'admin.access.item.create',
    'admin.access.item.update',
  )
  @Get('/:id')
  public getItemById(@Param('id', ParseIntPipe) id: number): Promise<ItemResponseDto> {
    return this.itemService.getItemById(id);
  }

  @ApiOperation({ description: 'Create new item' })
  @ApiGlobalResponse(ItemResponseDto)
  @ApiConflictResponse({ description: 'Item already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item.create')
  @Post()
  public createItem(
    @Body(ValidationPipe) dto: CreateItemRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ItemResponseDto> {
    return this.itemService.createItem({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update item by id' })
  @ApiGlobalResponse(ItemResponseDto)
  @ApiConflictResponse({ description: 'Item already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item.update')
  @Put('/:id')
  public updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateItemRequestDto,
  ): Promise<ItemResponseDto> {
    return this.itemService.updateItem(id, dto);
  }

  @ApiOperation({ description: 'Update item by id' })
  @ApiGlobalResponse(ItemResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item.delete')
  @Delete('/:id')
  public deleteItem(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ItemResponseDto> {
    return this.itemService.deleteItem(id);
  }
}
