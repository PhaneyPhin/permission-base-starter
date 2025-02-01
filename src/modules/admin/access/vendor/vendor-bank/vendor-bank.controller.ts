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
  CreateVendorBankRequestDto,
  UpdateVendorBankRequestDto,
  VendorBankResponseDto,
} from "./dtos";
import {
  VENDOR_BANK_FILTER_FIELDS,
  VendorBankService,
} from "./vendor-bank.service";

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
import { VendorBankEntity } from "./vendor-bank.entity";

@ApiTags("VendorBank")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/vendor-bank",
  version: "1",
})
export class VendorBankController {
  constructor(private readonly vendorBankService: VendorBankService) {}

  @ApiOperation({ description: "Get a paginated vendor-bank list" })
  @ApiPaginatedResponse(VendorBankResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(VENDOR_BANK_FILTER_FIELDS)
  @Permissions(
    "admin.access.vendor-bank.read",
    "admin.access.vendor-bank.create",
    "admin.access.vendor-bank.update"
  )
  @Get()
  public getVendorBanks(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<VendorBankResponseDto>> {
    return this.vendorBankService.list<VendorBankEntity, VendorBankResponseDto>(
      pagination
    );
  }

  @ApiOperation({ description: "Get all vendor-bank list form select form" })
  @Permissions(
    "admin.access.vendor-bank.read",
    "admin.access.vendor-bank.create",
    "admin.access.vendor-bank.update"
  )
  @Get("/select-options")
  public getAllVendorBankForSelect(): Promise<{ id: string; name: string }[]> {
    return this.vendorBankService.getAllVendorBank();
  }

  @ApiOperation({ description: "Get vendor-bank by id" })
  @ApiGlobalResponse(VendorBankResponseDto)
  @Permissions(
    "admin.access.vendor-bank.read",
    "admin.access.vendor-bank.create",
    "admin.access.vendor-bank.update"
  )
  @Get("/:id")
  public getVendorBankById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorBankResponseDto> {
    return this.vendorBankService.getVendorBankById(id);
  }

  @ApiOperation({ description: "Create new vendor-bank" })
  @ApiGlobalResponse(VendorBankResponseDto)
  @ApiConflictResponse({ description: "VendorBank already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-bank.create")
  @Post()
  public createVendorBank(
    @Body(ValidationPipe) dto: CreateVendorBankRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<VendorBankResponseDto> {
    return this.vendorBankService.createVendorBank({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update vendor-bank by id" })
  @ApiGlobalResponse(VendorBankResponseDto)
  @ApiConflictResponse({ description: "VendorBank already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-bank.update")
  @Put("/:id")
  public updateVendorBank(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVendorBankRequestDto
  ): Promise<VendorBankResponseDto> {
    return this.vendorBankService.updateVendorBank(id, dto);
  }

  @ApiOperation({ description: "Update vendor-bank by id" })
  @ApiGlobalResponse(VendorBankResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-bank.delete")
  @Delete("/:id")
  public deleteVendorBank(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorBankResponseDto> {
    return this.vendorBankService.deleteVendorBank(id);
  }
}
