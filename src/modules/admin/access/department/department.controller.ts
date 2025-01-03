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

import { DEPARTMENT_FILTER_FIELDS, DepartmentService } from './department.service';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
  DepartmentResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { DepartmentEntity } from './department.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Department')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/department',
  version: '1',
})
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ description: 'Get a paginated department list' })
  @ApiPaginatedResponse(DepartmentResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(DEPARTMENT_FILTER_FIELDS)
  @Permissions(
    'admin.access.department.read',
    'admin.access.department.create',
    'admin.access.department.update',
  )
  @Get()
  public getDepartments(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<DepartmentResponseDto>> {
    return this.departmentService.list<DepartmentEntity, DepartmentResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all department list form select form' })  
  @Permissions(
    'admin.access.department.read',
    'admin.access.department.create',
    'admin.access.department.update',
  )
  @Get('/select-options')
  public getAllDepartmentForSelect(): Promise<{ id: string, name: string }[]> {
    return this.departmentService.getAllDepartment();
  }

  @ApiOperation({ description: 'Get department by id' })
  @ApiGlobalResponse(DepartmentResponseDto)
  @Permissions(
    'admin.access.department.read',
    'admin.access.department.create',
    'admin.access.department.update',
  )
  @Get('/:id')
  public getDepartmentById(@Param('id', ParseIntPipe) id: number): Promise<DepartmentResponseDto> {
    return this.departmentService.getDepartmentById(id);
  }

  @ApiOperation({ description: 'Create new department' })
  @ApiGlobalResponse(DepartmentResponseDto)
  @ApiConflictResponse({ description: 'Department already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.department.create')
  @Post()
  public createDepartment(
    @Body(ValidationPipe) dto: CreateDepartmentRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<DepartmentResponseDto> {
    return this.departmentService.createDepartment({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update department by id' })
  @ApiGlobalResponse(DepartmentResponseDto)
  @ApiConflictResponse({ description: 'Department already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.department.update')
  @Put('/:id')
  public updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateDepartmentRequestDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentService.updateDepartment(id, dto);
  }

  @ApiOperation({ description: 'Update department by id' })
  @ApiGlobalResponse(DepartmentResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.department.delete')
  @Delete('/:id')
  public deleteDepartment(
    @Param('id', ParseIntPipe) id: number
  ): Promise<DepartmentResponseDto> {
    return this.departmentService.deleteDepartment(id);
  }
}
