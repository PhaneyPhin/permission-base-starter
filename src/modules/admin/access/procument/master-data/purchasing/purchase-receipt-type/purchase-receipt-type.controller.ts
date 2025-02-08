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
  CreatePurchaseReceiptTypeRequestDto,
  PurchaseReceiptTypeResponseDto,
  UpdatePurchaseReceiptTypeRequestDto,
} from "./dtos";
import {
  PURCHASE_RECEIPT_TYPE_FILTER_FIELDS,
  PurchaseReceiptTypeService,
} from "./purchase-receipt-type.service";

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
import { PurchaseReceiptTypeEntity } from "./purchase-receipt-type.entity";

@ApiTags("PurchaseReceiptType")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/purchase-receipt-type",
  version: "1",
})
export class PurchaseReceiptTypeController {
  constructor(
    private readonly purchaseReceiptTypeService: PurchaseReceiptTypeService
  ) {}

  @ApiOperation({ description: "Get a paginated purchase-receipt-type list" })
  @ApiPaginatedResponse(PurchaseReceiptTypeResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(PURCHASE_RECEIPT_TYPE_FILTER_FIELDS)
  @Permissions(
    "admin.access.purchase-receipt-type.read",
    "admin.access.purchase-receipt-type.create",
    "admin.access.purchase-receipt-type.update"
  )
  @Get()
  public getPurchaseReceiptTypes(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PurchaseReceiptTypeResponseDto>> {
    return this.purchaseReceiptTypeService.list<
      PurchaseReceiptTypeEntity,
      PurchaseReceiptTypeResponseDto
    >(pagination);
  }

  @ApiOperation({
    description: "Get all purchase-receipt-type list form select form",
  })
  @Permissions(
    "admin.access.purchase-receipt-type.read",
    "admin.access.purchase-receipt-type.create",
    "admin.access.purchase-receipt-type.update"
  )
  @Get("/select-options")
  public getAllPurchaseReceiptTypeForSelect(): Promise<
    { id: string; name: string }[]
  > {
    return this.purchaseReceiptTypeService.getAllPurchaseReceiptType();
  }

  @ApiOperation({ description: "Get purchase-receipt-type by id" })
  @ApiGlobalResponse(PurchaseReceiptTypeResponseDto)
  @Permissions(
    "admin.access.purchase-receipt-type.read",
    "admin.access.purchase-receipt-type.create",
    "admin.access.purchase-receipt-type.update"
  )
  @Get("/:id")
  public getPurchaseReceiptTypeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseReceiptTypeResponseDto> {
    return this.purchaseReceiptTypeService.getPurchaseReceiptTypeById(id);
  }

  @ApiOperation({ description: "Create new purchase-receipt-type" })
  @ApiGlobalResponse(PurchaseReceiptTypeResponseDto)
  @ApiConflictResponse({ description: "PurchaseReceiptType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt-type.create")
  @Post()
  public createPurchaseReceiptType(
    @Body(ValidationPipe) dto: CreatePurchaseReceiptTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseReceiptTypeResponseDto> {
    return this.purchaseReceiptTypeService.createPurchaseReceiptType({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-receipt-type by id" })
  @ApiGlobalResponse(PurchaseReceiptTypeResponseDto)
  @ApiConflictResponse({ description: "PurchaseReceiptType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt-type.update")
  @Put("/:id")
  public updatePurchaseReceiptType(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseReceiptTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseReceiptTypeResponseDto> {
    return this.purchaseReceiptTypeService.updatePurchaseReceiptType(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-receipt-type by id" })
  @ApiGlobalResponse(PurchaseReceiptTypeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt-type.delete")
  @Delete("/:id")
  public deletePurchaseReceiptType(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseReceiptTypeResponseDto> {
    return this.purchaseReceiptTypeService.deletePurchaseReceiptType(id);
  }
}
