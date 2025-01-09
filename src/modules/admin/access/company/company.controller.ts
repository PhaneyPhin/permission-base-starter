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

import { COMPANY_FILTER_FIELDS, CompanyService } from './company.service';
import {
  CreateCompanyRequestDto,
  UpdateCompanyRequestDto,
  CompanyResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { CompanyEntity } from './company.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Company')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/company',
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ description: 'Get a paginated company list' })
  @ApiPaginatedResponse(CompanyResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(COMPANY_FILTER_FIELDS)
  @Permissions(
    'admin.access.company.read',
    'admin.access.company.create',
    'admin.access.company.update',
  )
  @Get()
  public getCompanys(@PaginationParams({ maxAllowedSize: 100 }) pagination: PaginationRequest): Promise<PaginationResponseDto<CompanyResponseDto>> {
    return this.companyService.list<CompanyEntity, CompanyResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all company list form select form' })  
  @Permissions(
    'admin.access.company.read',
    'admin.access.company.create',
    'admin.access.company.update',
  )
  @Get('/select-options')
  public getAllCompanyForSelect(): Promise<{ id: string, name: string }[]> {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ description: 'Get company by id' })
  @ApiGlobalResponse(CompanyResponseDto)
  @Permissions(
    'admin.access.company.read',
    'admin.access.company.create',
    'admin.access.company.update',
  )
  @Get('/:id')
  public getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<CompanyResponseDto> {
    return this.companyService.getCompanyById(id);
  }

  @ApiOperation({ description: 'Create new company' })
  @ApiGlobalResponse(CompanyResponseDto)
  @ApiConflictResponse({ description: 'Company already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.company.create')
  @Post()
  public createCompany(
    @Body(ValidationPipe) dto: CreateCompanyRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CompanyResponseDto> {
    return this.companyService.createCompany({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update company by id' })
  @ApiGlobalResponse(CompanyResponseDto)
  @ApiConflictResponse({ description: 'Company already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.company.update')
  @Put('/:id')
  public updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateCompanyRequestDto,
  ): Promise<CompanyResponseDto> {
    return this.companyService.updateCompany(id, dto);
  }

  @ApiOperation({ description: 'Update company by id' })
  @ApiGlobalResponse(CompanyResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.company.delete')
  @Delete('/:id')
  public deleteCompany(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CompanyResponseDto> {
    return this.companyService.deleteCompany(id);
  }
}
