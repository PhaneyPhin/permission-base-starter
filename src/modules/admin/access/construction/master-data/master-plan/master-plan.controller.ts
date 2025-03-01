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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import {
  CreateMasterPlanRequestDto,
  MasterPlanResponseDto,
  UpdateMasterPlanRequestDto,
} from "./dtos";
import {
  MASTER_PLAN_FILTER_FIELDS,
  MasterPlanService,
} from "./master-plan.service";

import { UserEntity } from "@admin/access/users/user.entity";
import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from "@auth";
import { ApiGlobalResponse } from "@common/decorators";
import { ApiFields } from "@common/decorators/api-fields.decorator";
import {
  ApiPaginatedResponse,
  PaginationParams,
  PaginationRequest,
  PaginationResponseDto,
} from "@libs/pagination";
import { MasterPlanStatus } from "./enums/master-plan-status.enum";
import { MasterPlanEntity } from "./master-plan.entity";

@ApiTags("MasterPlan")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "/access/construction/master-data/master-plan",
  version: "1",
})
export class MasterPlanController {
  constructor(private readonly masterPlanService: MasterPlanService) {}

  @ApiOperation({ description: "Get a paginated master-plan list" })
  @ApiPaginatedResponse(MasterPlanResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(MASTER_PLAN_FILTER_FIELDS)
  @Permissions(
    "admin.access.master-plan.read",
    "admin.access.master-plan.create",
    "admin.access.master-plan.update"
  )
  @Get()
  public getMasterPlans(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<MasterPlanResponseDto>> {
    return this.masterPlanService.list<MasterPlanEntity, MasterPlanResponseDto>(
      pagination
    );
  }

  @ApiOperation({ description: "Get a paginated master-plan list" })
  @Get("/status-list")
  public getMasterPlanStatus(
    @PaginationParams() pagination: PaginationRequest
  ): string[] {
    return Object.values(MasterPlanStatus);
  }

  @ApiOperation({ description: "Get all master-plan list form select form" })
  @Permissions(
    "admin.access.master-plan.read",
    "admin.access.master-plan.create",
    "admin.access.master-plan.update"
  )
  @Get("/select-options")
  public getAllMasterPlanForSelect(): Promise<any[]> {
    return this.masterPlanService.getAllMasterPlan();
  }

  @ApiOperation({ description: "Get master-plan by id" })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @Permissions(
    "admin.access.master-plan.read",
    "admin.access.master-plan.create",
    "admin.access.master-plan.update"
  )
  @Get("/:id")
  public getMasterPlanById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.getMasterPlanById(id);
  }

  @ApiOperation({ description: "Create new master-plan" })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @ApiConflictResponse({ description: "MasterPlan already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.master-plan.create")
  @Post()
  public createMasterPlan(
    @Body(ValidationPipe) dto: CreateMasterPlanRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.createMasterPlan({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update master-plan by id" })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @ApiConflictResponse({ description: "MasterPlan already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.master-plan.update")
  @Put("/:id")
  public updateMasterPlan(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateMasterPlanRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.updateMasterPlan(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update master-plan by id" })
  @ApiGlobalResponse(MasterPlanResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.master-plan.delete")
  @Delete("/:id")
  public deleteMasterPlan(
    @Param("id", ParseIntPipe) id: number
  ): Promise<MasterPlanResponseDto> {
    return this.masterPlanService.deleteMasterPlan(id);
  }
}
