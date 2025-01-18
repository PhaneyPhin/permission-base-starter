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

import { ANALYSIS_CODE_FILTER_FIELDS, AnalysisCodeService } from './analysis-code.service';
import {
  CreateAnalysisCodeRequestDto,
  UpdateAnalysisCodeRequestDto,
  AnalysisCodeResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { AnalysisCodeEntity } from './analysis-code.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('AnalysisCode')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/construction/master-data/analysis-code',
  version: '1',
})
export class AnalysisCodeController {
  constructor(private readonly analysisCodeService: AnalysisCodeService) {}

  @ApiOperation({ description: 'Get a paginated analysis-code list' })
  @ApiPaginatedResponse(AnalysisCodeResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(ANALYSIS_CODE_FILTER_FIELDS)
  @Permissions(
    'admin.access.analysis-code.read',
    'admin.access.analysis-code.create',
    'admin.access.analysis-code.update',
  )
  @Get()
  public getAnalysisCodes(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<AnalysisCodeResponseDto>> {
    return this.analysisCodeService.list<AnalysisCodeEntity, AnalysisCodeResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all analysis-code list form select form' })  
  @Permissions(
    'admin.access.analysis-code.read',
    'admin.access.analysis-code.create',
    'admin.access.analysis-code.update',
  )
  @Get('/select-options')
  public getAllAnalysisCodeForSelect(): Promise<{ id: string, name: string }[]> {
    return this.analysisCodeService.getAllAnalysisCode();
  }

  @ApiOperation({ description: 'Get analysis-code by id' })
  @ApiGlobalResponse(AnalysisCodeResponseDto)
  @Permissions(
    'admin.access.analysis-code.read',
    'admin.access.analysis-code.create',
    'admin.access.analysis-code.update',
  )
  @Get('/:id')
  public getAnalysisCodeById(@Param('id', ParseIntPipe) id: number): Promise<AnalysisCodeResponseDto> {
    return this.analysisCodeService.getAnalysisCodeById(id);
  }

  @ApiOperation({ description: 'Create new analysis-code' })
  @ApiGlobalResponse(AnalysisCodeResponseDto)
  @ApiConflictResponse({ description: 'AnalysisCode already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.analysis-code.create')
  @Post()
  public createAnalysisCode(
    @Body(ValidationPipe) dto: CreateAnalysisCodeRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<AnalysisCodeResponseDto> {
    return this.analysisCodeService.createAnalysisCode({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update analysis-code by id' })
  @ApiGlobalResponse(AnalysisCodeResponseDto)
  @ApiConflictResponse({ description: 'AnalysisCode already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.analysis-code.update')
  @Put('/:id')
  public updateAnalysisCode(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateAnalysisCodeRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<AnalysisCodeResponseDto> {
    return this.analysisCodeService.updateAnalysisCode(id, { ...dto, updatedBy: user.id });
  }

  @ApiOperation({ description: 'Update analysis-code by id' })
  @ApiGlobalResponse(AnalysisCodeResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.analysis-code.delete')
  @Delete('/:id')
  public deleteAnalysisCode(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AnalysisCodeResponseDto> {
    return this.analysisCodeService.deleteAnalysisCode(id);
  }
}
