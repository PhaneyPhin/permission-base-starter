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

import { MASTER_PLAN_FILTER_FIELDS, MasterPlanService } from './master-plan.service';
import {
  CreateMasterPlanRequestDto,
  UpdateMasterPlanRequestDto,
  MasterPlanResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { MasterPlanEntity } from './master-plan.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('MasterPlan')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: '/access/construction/master-data/master-plan',
  version: '1',
})
export class MasterPlanController {
  constructor(private readonly masterPlanService: MasterPlanService) {}

  @ApiOperation({ description: 'Get a paginated master-plan list' })
  @ApiPaginatedResponse(MasterPlanResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(MASTER_PLAN_FILTER_FIELDS)
  @Permissions(
    'admin.access.master-plan.read',
    'admin.access.master-plan.create',
    'admin.access.master-plan.update',
  )
  @Get()
  public getMasterPlans(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<MasterPlanResponseDto>> {
    return this.masterPlanService.list<MasterPlanEntity, MasterPlanResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all master-plan list form select form' })  
  @Permissions(
    'admin.access.master-plan.read',
    'admin.access.master-plan.create',
    'admin.access.master-plan.update',
  )
  @Get('/select-options')
  public getAllMasterPlanForSelect(): Promise<{ id: string, name: string }[]> {
    return this.masterPlanService.getAllMasterPlan();
  }

  @ApiOperation({ description: 'Get master-plan by id' })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @Permissions(
    'admin.access.master-plan.read',
    'admin.access.master-plan.create',
    'admin.access.master-plan.update',
  )
  @Get('/:id')
  public getMasterPlanById(@Param('id', ParseIntPipe) id: number): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.getMasterPlanById(id);
  }

  @ApiOperation({ description: 'Create new master-plan' })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @ApiConflictResponse({ description: 'MasterPlan already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.master-plan.create')
  @Post()
  public createMasterPlan(
    @Body(ValidationPipe) dto: CreateMasterPlanRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.createMasterPlan({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update master-plan by id' })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @ApiConflictResponse({ description: 'MasterPlan already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.master-plan.update')
  @Put('/:id')
  public updateMasterPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateMasterPlanRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.updateMasterPlan(id, { ...dto, updatedBy: user.id });
  }

  @ApiOperation({ description: 'Update master-plan by id' })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.master-plan.delete')
  @Delete('/:id')
  public deleteMasterPlan(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.deleteMasterPlan(id);
  }
}
