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
  CreateQuotationTypeRequestDto,
  QuotationTypeResponseDto,
  UpdateQuotationTypeRequestDto,
} from "./dtos";
import {
  QUOTATION_TYPE_FILTER_FIELDS,
  QuotationTypeService,
} from "./quotation-type.service";

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
import { QuotationTypeEntity } from "./quotation-type.entity";

@ApiTags("QuotationType")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/quotation-type",
  version: "1",
})
export class QuotationTypeController {
  constructor(private readonly quotationTypeService: QuotationTypeService) {}

  @ApiOperation({ description: "Get a paginated quotation-type list" })
  @ApiPaginatedResponse(QuotationTypeResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(QUOTATION_TYPE_FILTER_FIELDS)
  @Permissions(
    "admin.access.quotation-type.read",
    "admin.access.quotation-type.create",
    "admin.access.quotation-type.update"
  )
  @Get()
  public getQuotationTypes(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<QuotationTypeResponseDto>> {
    return this.quotationTypeService.list<
      QuotationTypeEntity,
      QuotationTypeResponseDto
    >(pagination);
  }

  @ApiOperation({ description: "Get all quotation-type list form select form" })
  @Permissions(
    "admin.access.quotation-type.read",
    "admin.access.quotation-type.create",
    "admin.access.quotation-type.update"
  )
  @Get("/select-options")
  public getAllQuotationTypeForSelect(): Promise<
    { id: string; name: string }[]
  > {
    return this.quotationTypeService.getAllQuotationType();
  }

  @ApiOperation({ description: "Get quotation-type by id" })
  @ApiGlobalResponse(QuotationTypeResponseDto)
  @Permissions(
    "admin.access.quotation-type.read",
    "admin.access.quotation-type.create",
    "admin.access.quotation-type.update"
  )
  @Get("/:id")
  public getQuotationTypeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<QuotationTypeResponseDto> {
    return this.quotationTypeService.getQuotationTypeById(id);
  }

  @ApiOperation({ description: "Create new quotation-type" })
  @ApiGlobalResponse(QuotationTypeResponseDto)
  @ApiConflictResponse({ description: "QuotationType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.quotation-type.create")
  @Post()
  public createQuotationType(
    @Body(ValidationPipe) dto: CreateQuotationTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<QuotationTypeResponseDto> {
    return this.quotationTypeService.createQuotationType({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update quotation-type by id" })
  @ApiGlobalResponse(QuotationTypeResponseDto)
  @ApiConflictResponse({ description: "QuotationType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.quotation-type.update")
  @Put("/:id")
  public updateQuotationType(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateQuotationTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<QuotationTypeResponseDto> {
    return this.quotationTypeService.updateQuotationType(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update quotation-type by id" })
  @ApiGlobalResponse(QuotationTypeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.quotation-type.delete")
  @Delete("/:id")
  public deleteQuotationType(
    @Param("id", ParseIntPipe) id: number
  ): Promise<QuotationTypeResponseDto> {
    return this.quotationTypeService.deleteQuotationType(id);
  }
}
