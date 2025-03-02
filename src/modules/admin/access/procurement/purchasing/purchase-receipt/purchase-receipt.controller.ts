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
  CreatePurchaseReceiptRequestDto,
  PurchaseReceiptResponseDto,
  UpdatePurchaseReceiptRequestDto,
} from "./dtos";
import {
  PURCHASE_RECEIPT_FILTER_FIELDS,
  PurchaseReceiptService,
} from "./purchase-receipt.service";

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
import { PurchaseReceiptEntity } from "./purchase-receipt.entity";

@ApiTags("PurchaseReceipt")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/purchase-receipt",
  version: "1",
})
export class PurchaseReceiptController {
  constructor(
    private readonly purchaseReceiptService: PurchaseReceiptService
  ) {}

  @ApiOperation({ description: "Get a paginated purchase-receipt list" })
  @ApiPaginatedResponse(PurchaseReceiptResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(PURCHASE_RECEIPT_FILTER_FIELDS)
  @Permissions(
    "admin.access.purchase-receipt.read",
    "admin.access.purchase-receipt.create",
    "admin.access.purchase-receipt.update"
  )
  @Get()
  public getPurchaseReceipts(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PurchaseReceiptResponseDto>> {
    return this.purchaseReceiptService.list<
      PurchaseReceiptEntity,
      PurchaseReceiptResponseDto
    >(pagination);
  }

  @ApiOperation({
    description: "Get all purchase-receipt list form select form",
  })
  @Permissions(
    "admin.access.purchase-receipt.read",
    "admin.access.purchase-receipt.create",
    "admin.access.purchase-receipt.update"
  )
  @Get("/select-options")
  public getAllPurchaseReceiptForSelect(): Promise<any[]> {
    return this.purchaseReceiptService.getAllPurchaseReceipt();
  }

  @ApiOperation({ description: "Get purchase-receipt by id" })
  @ApiGlobalResponse(PurchaseReceiptResponseDto)
  @Permissions(
    "admin.access.purchase-receipt.read",
    "admin.access.purchase-receipt.create",
    "admin.access.purchase-receipt.update"
  )
  @Get("/:id")
  public getPurchaseReceiptById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseReceiptResponseDto> {
    return this.purchaseReceiptService.getPurchaseReceiptById(id);
  }

  @ApiOperation({ description: "Create new purchase-receipt" })
  @ApiGlobalResponse(PurchaseReceiptResponseDto)
  @ApiConflictResponse({ description: "PurchaseReceipt already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt.create")
  @Post()
  public createPurchaseReceipt(
    @Body(ValidationPipe) dto: CreatePurchaseReceiptRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseReceiptResponseDto> {
    return this.purchaseReceiptService.createPurchaseReceipt({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-receipt by id" })
  @ApiGlobalResponse(PurchaseReceiptResponseDto)
  @ApiConflictResponse({ description: "PurchaseReceipt already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt.update")
  @Put("/:id")
  public updatePurchaseReceipt(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePurchaseReceiptRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PurchaseReceiptResponseDto> {
    return this.purchaseReceiptService.updatePurchaseReceipt(id, {
      ...dto,
      updatedBy: user.id,
    });
  }

  @ApiOperation({ description: "Update purchase-receipt by id" })
  @ApiGlobalResponse(PurchaseReceiptResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.purchase-receipt.delete")
  @Delete("/:id")
  public deletePurchaseReceipt(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PurchaseReceiptResponseDto> {
    return this.purchaseReceiptService.deletePurchaseReceipt(id);
  }
}
