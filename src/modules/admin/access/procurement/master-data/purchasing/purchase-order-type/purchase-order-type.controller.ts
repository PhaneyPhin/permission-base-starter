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
  CreatePurchaseOrderTypeRequestDto,
  PurchaseOrderTypeResponseDto,
  UpdatePurchaseOrderTypeRequestDto,
} from "./dtos";
import {
  PURCHASE_ORDER_TYPE_FILTER_FIELDS,
  PurchaseOrderTypeService,
} from "./purchase-order-type.service";

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
import { PurchaseOrderTypeEntity } from "./purchase-order-type.entity";

@ApiTags("PurchaseOrderType")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/purchase-order-type",
  version: "1",
})
export class PurchaseOrderTypeController {
  constructor(
    private readonly purchaseOrderTypeService: PurchaseOrderTypeService
  ) {}

  @ApiOperation({ description: "Get a paginated purchase-order-type list" })
  @ApiPaginatedResponse(PurchaseOrderTypeResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(PURCHASE_ORDER_TYPE_FILTER_FIELDS)
  @Permissions(
    "admin.access.purchase-order-type.read",
    "admin.access.purchase-order-type.create",
    "admin.access.purchase-order-type.update"
  )
  @Get()
  public getPurchaseOrderTypes(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PurchaseOrderTypeResponseDto>> {
    return this.purchaseOrderTypeService.list<
      PurchaseOrderTypeEntity,
      PurchaseOrderTypeResponseDto
    >(pagination);
  }

  @ApiOperation({
    description: "Get all purchase-order-type list form select form",
  })
  @Permissions(
    "admin.access.purchase-order-type.read",
    "admin.access.purchase-order-type.create",
    "admin.access.purchase-order-type.update"
  )
  @Get("/select-options")
  public getAllPurchaseOrderTypeForSelect(): Promise<
    PurchaseOrderTypeEntity[]
  > {
    return this.purchaseOrderTypeService.getAllPurchaseOrderType();
  }

  @ApiOperation({ description: "Get purchase-order-type by id" })
  @ApiGlobalResponse(PurchaseOrderTypeResponseDto)
  @Permissions(
    "admin.access.purchase-order-type.read",
    "admin.access.purchase-order-type.create",
    "admin.access.purchase-order-type.update"
  )
  @Get("/:id")
  public getPurchaseOrderTypeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseOrderTypeResponseDto> {
    return this.purchaseOrderTypeService.getPurchaseOrderTypeById(id);
  }

  @ApiOperation({ description: "Create new purchase-order-type" })
  @ApiGlobalResponse(PurchaseOrderTypeResponseDto)
  @ApiConflictResponse({ description: "PurchaseOrderType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-order-type.create")
  @Post()
  public createPurchaseOrderType(
    @Body(ValidationPipe) dto: CreatePurchaseOrderTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseOrderTypeResponseDto> {
    return this.purchaseOrderTypeService.createPurchaseOrderType({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-order-type by id" })
  @ApiGlobalResponse(PurchaseOrderTypeResponseDto)
  @ApiConflictResponse({ description: "PurchaseOrderType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-order-type.update")
  @Put("/:id")
  public updatePurchaseOrderType(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseOrderTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseOrderTypeResponseDto> {
    return this.purchaseOrderTypeService.updatePurchaseOrderType(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-order-type by id" })
  @ApiGlobalResponse(PurchaseOrderTypeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-order-type.delete")
  @Delete("/:id")
  public deletePurchaseOrderType(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseOrderTypeResponseDto> {
    return this.purchaseOrderTypeService.deletePurchaseOrderType(id);
  }
}
