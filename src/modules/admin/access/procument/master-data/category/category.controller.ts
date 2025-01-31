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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { CATEGORY_FILTER_FIELDS, CategoryService } from './category.service';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
  CategoryResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { CategoryEntity } from './category.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Category')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ description: 'Get a paginated category list' })
  @ApiPaginatedResponse(CategoryResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(CATEGORY_FILTER_FIELDS)
  @Permissions(
    'admin.access.category.read',
    'admin.access.category.create',
    'admin.access.category.update',
  )
  @Get()
  public getCategorys(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<CategoryResponseDto>> {
    return this.categoryService.list<CategoryEntity, CategoryResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all category list form select form' })  
  @Permissions(
    'admin.access.category.read',
    'admin.access.category.create',
    'admin.access.category.update',
  )
  @Get('/select-options')
  public async  getAllCategoryForSelect() {
    return await this.categoryService.getAllCategory();
  }
  @ApiOperation({ description: 'Get all category by item group for select form' })  
  @Permissions(
    'admin.access.category.read',
    'admin.access.category.create',
    'admin.access.category.update',
  )
  @Get('/select-by-item-group')
  public async getCategoryByItemGroupForSelect(
    @Query('itemGroupId') itemGroupId?: number,
  ): Promise<{ id: number; nameEn: string; nameKh: string; parentId: number | null }[]> {
    return this.categoryService.getCategoryByItemGroup(itemGroupId);
  }


  @ApiOperation({ description: 'Get category by id' })
  @ApiGlobalResponse(CategoryResponseDto)
  @Permissions(
    'admin.access.category.read',
    'admin.access.category.create',
    'admin.access.category.update',
  )
  @Get('/:id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<CategoryResponseDto> {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ description: 'Create new category' })
  @ApiGlobalResponse(CategoryResponseDto)
  @ApiConflictResponse({ description: 'Category already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.category.create')
  @Post()
  public createCategory(
    @Body(ValidationPipe) dto: CreateCategoryRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.createCategory({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update category by id' })
  @ApiGlobalResponse(CategoryResponseDto)
  @ApiConflictResponse({ description: 'Category already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.category.update')
  @Put('/:id')
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, dto);
  }

  @ApiOperation({ description: 'Update category by id' })
  @ApiGlobalResponse(CategoryResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.category.delete')
  @Delete('/:id')
  public deleteCategory(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryResponseDto> {
    return this.categoryService.deleteCategory(id);
  }
}
