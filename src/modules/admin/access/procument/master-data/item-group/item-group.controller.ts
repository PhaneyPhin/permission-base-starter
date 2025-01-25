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

import { ITEM_GROUP_FILTER_FIELDS, ItemGroupService } from './item-group.service';
import {
  CreateItemGroupRequestDto,
  UpdateItemGroupRequestDto,
  ItemGroupResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { ItemGroupEntity } from './item-group.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('ItemGroup')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/item-group',
  version: '1',
})
export class ItemGroupController {
  constructor(private readonly itemGroupService: ItemGroupService) {}

  @ApiOperation({ description: 'Get a paginated item-group list' })
  @ApiPaginatedResponse(ItemGroupResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(ITEM_GROUP_FILTER_FIELDS)
  @Permissions(
    'admin.access.item-group.read',
    'admin.access.item-group.create',
    'admin.access.item-group.update',
  )
  @Get()
  public getItemGroups(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<ItemGroupResponseDto>> {
    return this.itemGroupService.list<ItemGroupEntity, ItemGroupResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all item-group list form select form' })  
  @Permissions(
    'admin.access.item-group.read',
    'admin.access.item-group.create',
    'admin.access.item-group.update',
  )
  @Get('/select-options')
  public async  getAllItemGroupForSelect() {
    return await this.itemGroupService.getAllItemGroup();
  }

  @ApiOperation({ description: 'Get item-group by id' })
  @ApiGlobalResponse(ItemGroupResponseDto)
  @Permissions(
    'admin.access.item-group.read',
    'admin.access.item-group.create',
    'admin.access.item-group.update',
  )
  @Get('/:id')
  public getItemGroupById(@Param('id', ParseIntPipe) id: number): Promise<ItemGroupResponseDto> {
    return this.itemGroupService.getItemGroupById(id);
  }

  @ApiOperation({ description: 'Create new item-group' })
  @ApiGlobalResponse(ItemGroupResponseDto)
  @ApiConflictResponse({ description: 'ItemGroup already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item-group.create')
  @Post()
  public createItemGroup(
    @Body(ValidationPipe) dto: CreateItemGroupRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ItemGroupResponseDto> {
    return this.itemGroupService.createItemGroup({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update item-group by id' })
  @ApiGlobalResponse(ItemGroupResponseDto)
  @ApiConflictResponse({ description: 'ItemGroup already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item-group.update')
  @Put('/:id')
  public updateItemGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateItemGroupRequestDto,
  ): Promise<ItemGroupResponseDto> {
    return this.itemGroupService.updateItemGroup(id, dto);
  }

  @ApiOperation({ description: 'Update item-group by id' })
  @ApiGlobalResponse(ItemGroupResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.item-group.delete')
  @Delete('/:id')
  public deleteItemGroup(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ItemGroupResponseDto> {
    return this.itemGroupService.deleteItemGroup(id);
  }
}
