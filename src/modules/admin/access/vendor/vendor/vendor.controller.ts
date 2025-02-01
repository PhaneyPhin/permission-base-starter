import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { VENDOR_FILTER_FIELDS, VendorService } from './vendor.service';
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { VendorEntity } from './vendor.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Vendor')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/vendor',
  version: '1',
})
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @ApiOperation({ description: 'Get a paginated vendor list' })
  @ApiPaginatedResponse(VendorResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(VENDOR_FILTER_FIELDS)
  @Permissions(
    'admin.access.vendor.read',
    'admin.access.vendor.create',
    'admin.access.vendor.update',
  )
  @Get()
  public getVendors(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<VendorResponseDto>> {
    return this.vendorService.list<VendorEntity, VendorResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all vendor list form select form' })  
  @Permissions(
    'admin.access.vendor.read',
    'admin.access.vendor.create',
    'admin.access.vendor.update',
  )
  @Get('/select-options')
  public getAllVendorForSelect(): Promise<{ id: string, name: string }[]> {
    return this.vendorService.getAllVendor();
  }

  @ApiOperation({ description: 'Get vendor by id' })
  @ApiGlobalResponse(VendorResponseDto)
  @Permissions(
    'admin.access.vendor.read',
    'admin.access.vendor.create',
    'admin.access.vendor.update',
  )
  @Get('/:id')
  public getVendorById(@Param('id', ParseIntPipe) id: number): Promise<VendorResponseDto> {
    return this.vendorService.getVendorById(id);
  }

  @ApiOperation({ description: 'Create new vendor' })
  @ApiGlobalResponse(VendorResponseDto)
  @ApiConflictResponse({ description: 'Vendor already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.vendor.create')
  @Post()
  public createVendor(
    @Body(ValidationPipe) dto: CreateVendorRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<VendorResponseDto> {
    return this.vendorService.createVendor({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update vendor by id' })
  @ApiGlobalResponse(VendorResponseDto)
  @ApiConflictResponse({ description: 'Vendor already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.vendor.update')
  @Put('/:id')
  public updateVendor(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVendorRequestDto,
  ): Promise<VendorResponseDto> {
    return this.vendorService.updateVendor(id, dto);
  }

  @ApiOperation({ description: 'Update vendor by id' })
  @ApiGlobalResponse(VendorResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.vendor.delete')
  @Delete('/:id')
  public deleteVendor(
    @Param('id', ParseIntPipe) id: number
  ): Promise<VendorResponseDto> {
    return this.vendorService.deleteVendor(id);
  }
}
