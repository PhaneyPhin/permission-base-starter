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
  CreatePurchaseQuotationRequestDto,
  PurchaseQuotationResponseDto,
  UpdatePurchaseQuotationRequestDto,
} from "./dtos";
import {
  PURCHASE_QUOTATION_FILTER_FIELDS,
  PurchaseQuotationService,
} from "./purchase-quotation.service";

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
import { PurchaseQuotationEntity } from "./purchase-quotation.entity";

@ApiTags("PurchaseQuotation")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/purchase-quotation",
  version: "1",
})
export class PurchaseQuotationController {
  constructor(
    private readonly purchaseQuotationService: PurchaseQuotationService
  ) {}

  @ApiOperation({ description: "Get a paginated purchase-quotation list" })
  @ApiPaginatedResponse(PurchaseQuotationResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiQuery({
    name: "status",
    type: "string",
    required: false,
    example: "",
    description: "open,close",
  })
  @ApiQuery({
    name: "createdBy",
    type: "string",
    required: false,
    example: "admin",
  })
  @ApiQuery({
    name: "requestDate",
    type: "string",
    required: false,
    example: "",
    description: "2024-10-10,2024-10-11",
  })
  @ApiFields(PURCHASE_QUOTATION_FILTER_FIELDS)
  @Permissions(
    "admin.access.purchase-quotation.read",
    "admin.access.purchase-quotation.create",
    "admin.access.purchase-quotation.update"
  )
  @Get()
  public getPurchaseQuotations(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PurchaseQuotationResponseDto>> {
    return this.purchaseQuotationService.list<
      PurchaseQuotationEntity,
      PurchaseQuotationResponseDto
    >(pagination);
  }

  @ApiOperation({
    description: "Get all purchase-quotation list form select form",
  })
  @Permissions(
    "admin.access.purchase-quotation.read",
    "admin.access.purchase-quotation.create",
    "admin.access.purchase-quotation.update"
  )
  @Get("/select-options")
  public getAllPurchaseQuotationForSelect(): Promise<any[]> {
    return this.purchaseQuotationService.getAllPurchaseQuotation();
  }

  @ApiOperation({ description: "Get purchase-quotation by id" })
  @ApiGlobalResponse(PurchaseQuotationResponseDto)
  @Permissions(
    "admin.access.purchase-quotation.read",
    "admin.access.purchase-quotation.create",
    "admin.access.purchase-quotation.update"
  )
  @Get("/:id")
  public getPurchaseQuotationById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseQuotationResponseDto> {
    return this.purchaseQuotationService.getPurchaseQuotationById(id);
  }

  @ApiOperation({ description: "Create new purchase-quotation" })
  @ApiGlobalResponse(PurchaseQuotationResponseDto)
  @ApiConflictResponse({ description: "PurchaseQuotation already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-quotation.create")
  @Post()
  public createPurchaseQuotation(
    @Body(ValidationPipe) dto: CreatePurchaseQuotationRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseQuotationResponseDto> {
    return this.purchaseQuotationService.createPurchaseQuotation({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-quotation by id" })
  @ApiGlobalResponse(PurchaseQuotationResponseDto)
  @ApiConflictResponse({ description: "PurchaseQuotation already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-quotation.update")
  @Put("/:id")
  public updatePurchaseQuotation(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseQuotationRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseQuotationResponseDto> {
    return this.purchaseQuotationService.updatePurchaseQuotation(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-quotation by id" })
  @ApiGlobalResponse(PurchaseQuotationResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-quotation.delete")
  @Delete("/:id")
  public deletePurchaseQuotation(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseQuotationResponseDto> {
    return this.purchaseQuotationService.deletePurchaseQuotation(id);
  }
}
