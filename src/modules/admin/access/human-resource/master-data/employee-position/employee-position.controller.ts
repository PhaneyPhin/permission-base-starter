import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateEmployeePositionRequestDto,
  EmployeePositionResponseDto,
  UpdateEmployeePositionRequestDto,
} from './dtos';
import { EMPLOYEE_POSITION_FILTER_FIELDS, EmployeePositionService } from './employee-position.service';

import { UserEntity } from '@admin/access/users/user.entity';
import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { EmployeePositionEntity } from './employee-position.entity';

@ApiTags('EmployeePosition')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/human-resource/employee-position',
  version: '1',
})
export class EmployeePositionController {
  constructor(private readonly employeePositionService: EmployeePositionService) {}

  @ApiOperation({ description: 'Get a paginated employee-position list' })
  @ApiPaginatedResponse(EmployeePositionResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(EMPLOYEE_POSITION_FILTER_FIELDS)
  @Permissions(
    'admin.access.employee-position.read',
    'admin.access.employee-position.create',
    'admin.access.employee-position.update',
  )
  @Get()
  public getEmployeePositions(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<EmployeePositionResponseDto>> {
    return this.employeePositionService.list<EmployeePositionEntity, EmployeePositionResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all employee-position list form select form' })  
  @Permissions(
    'admin.access.employee-position.read',
    'admin.access.employee-position.create',
    'admin.access.employee-position.update',
  )
  @Get('/select-options')
  public getAllEmployeePositionForSelect(): Promise<{ id: string, name: string }[]> {
    return this.employeePositionService.getAllEmployeePosition();
  }

  @ApiOperation({ description: 'Get employee-position by id' })
  @ApiGlobalResponse(EmployeePositionResponseDto)
  @Permissions(
    'admin.access.employee-position.read',
    'admin.access.employee-position.create',
    'admin.access.employee-position.update',
  )
  @Get('/:id')
  public getEmployeePositionById(@Param('id', ParseIntPipe) id: number): Promise<EmployeePositionResponseDto> {
    return this.employeePositionService.getEmployeePositionById(id);
  }

  @ApiOperation({ description: 'Create new employee-position' })
  @ApiGlobalResponse(EmployeePositionResponseDto)
  @ApiConflictResponse({ description: 'EmployeePosition already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee-position.create')
  @Post()
  public createEmployeePosition(
    @Body(ValidationPipe) dto: CreateEmployeePositionRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<EmployeePositionResponseDto> {
    return this.employeePositionService.createEmployeePosition({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update employee-position by id' })
  @ApiGlobalResponse(EmployeePositionResponseDto)
  @ApiConflictResponse({ description: 'EmployeePosition already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee-position.update')
  @Put('/:id')
  public updateEmployeePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateEmployeePositionRequestDto,
  ): Promise<EmployeePositionResponseDto> {
    return this.employeePositionService.updateEmployeePosition(id, dto);
  }

  @ApiOperation({ description: 'Update employee-position by id' })
  @ApiGlobalResponse(EmployeePositionResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.employee-position.delete')
  @Delete('/:id')
  public deleteEmployeePosition(
    @Param('id', ParseIntPipe) id: number
  ): Promise<EmployeePositionResponseDto> {
    return this.employeePositionService.deleteEmployeePosition(id);
  }
}
