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
  CreateRequestTypeRequestDto,
  RequestTypeResponseDto,
  UpdateRequestTypeRequestDto,
} from "./dtos";
import {
  REQUEST_TYPE_FILTER_FIELDS,
  RequestTypeService,
} from "./request-type.service";

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
import { RequestTypeEntity } from "./request-type.entity";

@ApiTags("RequestType")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/request-type",
  version: "1",
})
export class RequestTypeController {
  constructor(private readonly requestTypeService: RequestTypeService) {}

  @ApiOperation({ description: "Get a paginated request-type list" })
  @ApiPaginatedResponse(RequestTypeResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(REQUEST_TYPE_FILTER_FIELDS)
  @Permissions(
    "admin.access.request-type.read",
    "admin.access.request-type.create",
    "admin.access.request-type.update"
  )
  @Get()
  public getRequestTypes(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<RequestTypeResponseDto>> {
    return this.requestTypeService.list<
      RequestTypeEntity,
      RequestTypeResponseDto
    >(pagination);
  }

  @ApiOperation({ description: "Get all request-type list form select form" })
  @Permissions(
    "admin.access.request-type.read",
    "admin.access.request-type.create",
    "admin.access.request-type.update"
  )
  @Get("/select-options")
  public getAllRequestTypeForSelect(): Promise<{ id: string; name: string }[]> {
    return this.requestTypeService.getAllRequestType();
  }

  @ApiOperation({ description: "Get request-type by id" })
  @ApiGlobalResponse(RequestTypeResponseDto)
  @Permissions(
    "admin.access.request-type.read",
    "admin.access.request-type.create",
    "admin.access.request-type.update"
  )
  @Get("/:id")
  public getRequestTypeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<RequestTypeResponseDto> {
    return this.requestTypeService.getRequestTypeById(id);
  }

  @ApiOperation({ description: "Create new request-type" })
  @ApiGlobalResponse(RequestTypeResponseDto)
  @ApiConflictResponse({ description: "RequestType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.request-type.create")
  @Post()
  public createRequestType(
    @Body(ValidationPipe) dto: CreateRequestTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RequestTypeResponseDto> {
    return this.requestTypeService.createRequestType({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update request-type by id" })
  @ApiGlobalResponse(RequestTypeResponseDto)
  @ApiConflictResponse({ description: "RequestType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.request-type.update")
  @Put("/:id")
  public updateRequestType(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateRequestTypeRequestDto
  ): Promise<RequestTypeResponseDto> {
    return this.requestTypeService.updateRequestType(id, dto);
  }

  @ApiOperation({ description: "Update request-type by id" })
  @ApiGlobalResponse(RequestTypeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.request-type.delete")
  @Delete("/:id")
  public deleteRequestType(
    @Param("id", ParseIntPipe) id: number
  ): Promise<RequestTypeResponseDto> {
    return this.requestTypeService.deleteRequestType(id);
  }
}
