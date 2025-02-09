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
  CreateVendorTypeRequestDto,
  UpdateVendorTypeRequestDto,
  VendorTypeResponseDto,
} from "./dtos";
import {
  VENDOR_TYPE_FILTER_FIELDS,
  VendorTypeService,
} from "./vendor-type.service";

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
import { VendorTypeEntity } from "./vendor-type.entity";

@ApiTags("VendorType")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/vendor-type",
  version: "1",
})
export class VendorTypeController {
  constructor(private readonly vendorTypeService: VendorTypeService) {}

  @ApiOperation({ description: "Get a paginated vendor-type list" })
  @ApiPaginatedResponse(VendorTypeResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(VENDOR_TYPE_FILTER_FIELDS)
  @Permissions(
    "admin.access.vendor-type.read",
    "admin.access.vendor-type.create",
    "admin.access.vendor-type.update"
  )
  @Get()
  public getVendorTypes(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<VendorTypeResponseDto>> {
    return this.vendorTypeService.list<VendorTypeEntity, VendorTypeResponseDto>(
      pagination
    );
  }

  @ApiOperation({ description: "Get all vendor-type list form select form" })
  @Permissions(
    "admin.access.vendor-type.read",
    "admin.access.vendor-type.create",
    "admin.access.vendor-type.update"
  )
  @Get("/select-options")
  public getAllVendorTypeForSelect(): Promise<any> {
    return this.vendorTypeService.getAllVendorType();
  }

  @ApiOperation({ description: "Get vendor-type by id" })
  @ApiGlobalResponse(VendorTypeResponseDto)
  @Permissions(
    "admin.access.vendor-type.read",
    "admin.access.vendor-type.create",
    "admin.access.vendor-type.update"
  )
  @Get("/:id")
  public getVendorTypeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorTypeResponseDto> {
    return this.vendorTypeService.getVendorTypeById(id);
  }

  @ApiOperation({ description: "Create new vendor-type" })
  @ApiGlobalResponse(VendorTypeResponseDto)
  @ApiConflictResponse({ description: "VendorType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-type.create")
  @Post()
  public createVendorType(
    @Body(ValidationPipe) dto: CreateVendorTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<VendorTypeResponseDto> {
    return this.vendorTypeService.createVendorType({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update vendor-type by id" })
  @ApiGlobalResponse(VendorTypeResponseDto)
  @ApiConflictResponse({ description: "VendorType already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-type.update")
  @Put("/:id")
  public updateVendorType(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVendorTypeRequestDto
  ): Promise<VendorTypeResponseDto> {
    return this.vendorTypeService.updateVendorType(id, dto);
  }

  @ApiOperation({ description: "Update vendor-type by id" })
  @ApiGlobalResponse(VendorTypeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-type.delete")
  @Delete("/:id")
  public deleteVendorType(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorTypeResponseDto> {
    return this.vendorTypeService.deleteVendorType(id);
  }
}
