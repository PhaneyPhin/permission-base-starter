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

import { EMPLOYEE_FILTER_FIELDS, EmployeeService } from './employee.service';
import {
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
  EmployeeResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { EmployeeEntity } from './employee.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Employee')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/employee',
  version: '1',
})
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ description: 'Get a paginated employee list' })
  @ApiPaginatedResponse(EmployeeResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(EMPLOYEE_FILTER_FIELDS)
  @Permissions(
    'admin.access.employee.read',
    'admin.access.employee.create',
    'admin.access.employee.update',
  )
  @Get()
  public getEmployees(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<EmployeeResponseDto>> {
    return this.employeeService.list<EmployeeEntity, EmployeeResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all employee list form select form' })  
  @Permissions(
    'admin.access.employee.read',
    'admin.access.employee.create',
    'admin.access.employee.update',
  )
  @Get('/select-options')
  public getAllEmployeeForSelect(): Promise<{ id: string, name: string }[]> {
    return this.employeeService.getAllEmployee();
  }

  @ApiOperation({ description: 'Get employee by id' })
  @ApiGlobalResponse(EmployeeResponseDto)
  @Permissions(
    'admin.access.employee.read',
    'admin.access.employee.create',
    'admin.access.employee.update',
  )
  @Get('/:id')
  public getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<EmployeeResponseDto> {
    return this.employeeService.getEmployeeById(id);
  }

  @ApiOperation({ description: 'Create new employee' })
  @ApiGlobalResponse(EmployeeResponseDto)
  @ApiConflictResponse({ description: 'Employee already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee.create')
  @Post()
  public createEmployee(
    @Body(ValidationPipe) dto: CreateEmployeeRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.createEmployee({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update employee by id' })
  @ApiGlobalResponse(EmployeeResponseDto)
  @ApiConflictResponse({ description: 'Employee already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee.update')
  @Put('/:id')
  public updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateEmployeeRequestDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.updateEmployee(id, dto);
  }

  @ApiOperation({ description: 'Update employee by id' })
  @ApiGlobalResponse(EmployeeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee.delete')
  @Delete('/:id')
  public deleteEmployee(
    @Param('id', ParseIntPipe) id: number
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.deleteEmployee(id);
  }
}
