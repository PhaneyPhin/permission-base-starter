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
  CreateVendorClassRequestDto,
  UpdateVendorClassRequestDto,
  VendorClassResponseDto,
} from "./dtos";
import {
  VENDOR_CLASS_FILTER_FIELDS,
  VendorClassService,
} from "./vendor-class.service";

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
import { VendorClassEntity } from "./vendor-class.entity";

@ApiTags("VendorClass")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/vendor-class",
  version: "1",
})
export class VendorClassController {
  constructor(private readonly vendorClassService: VendorClassService) {}

  @ApiOperation({ description: "Get a paginated vendor-class list" })
  @ApiPaginatedResponse(VendorClassResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(VENDOR_CLASS_FILTER_FIELDS)
  @Permissions(
    "admin.access.vendor-class.read",
    "admin.access.vendor-class.create",
    "admin.access.vendor-class.update"
  )
  @Get()
  public getVendorClasss(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<VendorClassResponseDto>> {
    return this.vendorClassService.list<
      VendorClassEntity,
      VendorClassResponseDto
    >(pagination);
  }

  @ApiOperation({ description: "Get all vendor-class list form select form" })
  @Permissions(
    "admin.access.vendor-class.read",
    "admin.access.vendor-class.create",
    "admin.access.vendor-class.update"
  )
  @Get("/select-options")
  public getAllVendorClassForSelect(): Promise<{ id: string; name: string }[]> {
    return this.vendorClassService.getAllVendorClass();
  }

  @ApiOperation({ description: "Get vendor-class by id" })
  @ApiGlobalResponse(VendorClassResponseDto)
  @Permissions(
    "admin.access.vendor-class.read",
    "admin.access.vendor-class.create",
    "admin.access.vendor-class.update"
  )
  @Get("/:id")
  public getVendorClassById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorClassResponseDto> {
    return this.vendorClassService.getVendorClassById(id);
  }

  @ApiOperation({ description: "Create new vendor-class" })
  @ApiGlobalResponse(VendorClassResponseDto)
  @ApiConflictResponse({ description: "VendorClass already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-class.create")
  @Post()
  public createVendorClass(
    @Body(ValidationPipe) dto: CreateVendorClassRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<VendorClassResponseDto> {
    return this.vendorClassService.createVendorClass({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update vendor-class by id" })
  @ApiGlobalResponse(VendorClassResponseDto)
  @ApiConflictResponse({ description: "VendorClass already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-class.update")
  @Put("/:id")
  public updateVendorClass(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVendorClassRequestDto
  ): Promise<VendorClassResponseDto> {
    return this.vendorClassService.updateVendorClass(id, dto);
  }

  @ApiOperation({ description: "Update vendor-class by id" })
  @ApiGlobalResponse(VendorClassResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.vendor-class.delete")
  @Delete("/:id")
  public deleteVendorClass(
    @Param("id", ParseIntPipe) id: number
  ): Promise<VendorClassResponseDto> {
    return this.vendorClassService.deleteVendorClass(id);
  }
}
