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

import { BRANCH_FILTER_FIELDS, BranchService } from './branch.service';
import {
  CreateBranchRequestDto,
  UpdateBranchRequestDto,
  BranchResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { BranchEntity } from './branch.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Branch')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/branch',
  version: '1',
})
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @ApiOperation({ description: 'Get a paginated branch list' })
  @ApiPaginatedResponse(BranchResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(BRANCH_FILTER_FIELDS)
  @Permissions(
    'admin.access.branch.read',
    'admin.access.branch.create',
    'admin.access.branch.update',
  )
  @Get()
  public getBranchs(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<BranchResponseDto>> {
    return this.branchService.list<BranchEntity, BranchResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all branch list form select form' })  
  @Permissions(
    'admin.access.branch.read',
    'admin.access.branch.create',
    'admin.access.branch.update',
  )
  @Get('/select-options')
  public getAllBranchForSelect(): Promise<BranchEntity[]> {
    return this.branchService.getAllBranch();
  }

  @ApiOperation({ description: 'Get branch by id' })
  @ApiGlobalResponse(BranchResponseDto)
  @Permissions(
    'admin.access.branch.read',
    'admin.access.branch.create',
    'admin.access.branch.update',
  )
  @Get('/:id')
  public getBranchById(@Param('id', ParseIntPipe) id: number): Promise<BranchResponseDto> {
    return this.branchService.getBranchById(id);
  }

  @ApiOperation({ description: 'Create new branch' })
  @ApiGlobalResponse(BranchResponseDto)
  @ApiConflictResponse({ description: 'Branch already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.branch.create')
  @Post()
  public createBranch(
    @Body(ValidationPipe) dto: CreateBranchRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<BranchResponseDto> {
    return this.branchService.createBranch({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update branch by id' })
  @ApiGlobalResponse(BranchResponseDto)
  @ApiConflictResponse({ description: 'Branch already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.branch.update')
  @Put('/:id')
  public updateBranch(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateBranchRequestDto,
  ): Promise<BranchResponseDto> {
    return this.branchService.updateBranch(id, dto);
  }

  @ApiOperation({ description: 'Update branch by id' })
  @ApiGlobalResponse(BranchResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.branch.delete')
  @Delete('/:id')
  public deleteBranch(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BranchResponseDto> {
    return this.branchService.deleteBranch(id);
  }
}
