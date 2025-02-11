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

import { VALUATION_METHOD_FILTER_FIELDS, ValuationMethodService } from './valuation-method.service';
import {
  CreateValuationMethodRequestDto,
  UpdateValuationMethodRequestDto,
  ValuationMethodResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { ValuationMethodEntity } from './valuation-method.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('ValuationMethod')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/valuation-method',
  version: '1',
})
export class ValuationMethodController {
  constructor(private readonly valuationMethodService: ValuationMethodService) {}

  @ApiOperation({ description: 'Get a paginated valuation-method list' })
  @ApiPaginatedResponse(ValuationMethodResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(VALUATION_METHOD_FILTER_FIELDS)
  @Permissions(
    'admin.access.valuation-method.read',
    'admin.access.valuation-method.create',
    'admin.access.valuation-method.update',
  )
  @Get()
  public getValuationMethods(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<ValuationMethodResponseDto>> {
    return this.valuationMethodService.list<ValuationMethodEntity, ValuationMethodResponseDto>(pagination);
  }
  
  @ApiOperation({ description: 'Get all valuation-method list form select form' })  
  @Permissions(
    'admin.access.item-group.read',
    'admin.access.item-group.create',
    'admin.access.item-group.update',
  )
  @Get('/select-options')
  public async  getAllValuationMethodForSelect() {
    return await this.valuationMethodService.getAllValuationMethod();
  }

  @ApiOperation({ description: 'Get valuation-method by id' })
  @ApiGlobalResponse(ValuationMethodResponseDto)
  @Permissions(
    'admin.access.valuation-method.read',
    'admin.access.valuation-method.create',
    'admin.access.valuation-method.update',
  )
  @Get('/:id')
  public getValuationMethodById(@Param('id', ParseIntPipe) id: number): Promise<ValuationMethodResponseDto> {
    return this.valuationMethodService.getValuationMethodById(id);
  }

  @ApiOperation({ description: 'Create new valuation-method' })
  @ApiGlobalResponse(ValuationMethodResponseDto)
  @ApiConflictResponse({ description: 'ValuationMethod already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.valuation-method.create')
  @Post()
  public createValuationMethod(
    @Body(ValidationPipe) dto: CreateValuationMethodRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ValuationMethodResponseDto> {
    return this.valuationMethodService.createValuationMethod({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update valuation-method by id' })
  @ApiGlobalResponse(ValuationMethodResponseDto)
  @ApiConflictResponse({ description: 'ValuationMethod already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.valuation-method.update')
  @Put('/:id')
  public updateValuationMethod(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateValuationMethodRequestDto,
  ): Promise<ValuationMethodResponseDto> {
    return this.valuationMethodService.updateValuationMethod(id, dto);
  }

  @ApiOperation({ description: 'Update valuation-method by id' })
  @ApiGlobalResponse(ValuationMethodResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.valuation-method.delete')
  @Delete('/:id')
  public deleteValuationMethod(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ValuationMethodResponseDto> {
    return this.valuationMethodService.deleteValuationMethod(id);
  }
}
