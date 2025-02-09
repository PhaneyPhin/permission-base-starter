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

import { BANK_FILTER_FIELDS, BankService } from './bank.service';
import {
  CreateBankRequestDto,
  UpdateBankRequestDto,
  BankResponseDto,
} from './dtos';

import { CurrentUser, Permissions, SuperUserGuard, TOKEN_NAME } from '@auth';
import { ApiGlobalResponse } from '@common/decorators';
import { ApiPaginatedResponse, PaginationParams, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { ApiFields } from '@common/decorators/api-fields.decorator';
import { BankEntity } from './bank.entity';
import { UserEntity } from '@admin/access/users/user.entity';

@ApiTags('Bank')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'access/bank',
  version: '1',
})
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @ApiOperation({ description: 'Get a paginated bank list' })
  @ApiPaginatedResponse(BankResponseDto)
  @ApiQuery({ name: 'search',type: 'string', required: false, example: '',})
  @ApiFields(BANK_FILTER_FIELDS)
  @Permissions(
    'admin.access.bank.read',
    'admin.access.bank.create',
    'admin.access.bank.update',
  )
  @Get()
  public getBanks(@PaginationParams() pagination: PaginationRequest): Promise<PaginationResponseDto<BankResponseDto>> {
    return this.bankService.list<BankEntity, BankResponseDto>(pagination);
  }

  @ApiOperation({ description: 'Get all bank list form select form' })  
  @Permissions(
    'admin.access.bank.read',
    'admin.access.bank.create',
    'admin.access.bank.update',
  )
  @Get('/select-options')
  public getAllBankForSelect(): Promise<BankEntity[]> {
    return this.bankService.getAllBank();
  }

  @ApiOperation({ description: 'Get bank by id' })
  @ApiGlobalResponse(BankResponseDto)
  @Permissions(
    'admin.access.bank.read',
    'admin.access.bank.create',
    'admin.access.bank.update',
  )
  @Get('/:id')
  public getBankById(@Param('id', ParseIntPipe) id: number): Promise<BankResponseDto> {
    return this.bankService.getBankById(id);
  }

  @ApiOperation({ description: 'Create new bank' })
  @ApiGlobalResponse(BankResponseDto)
  @ApiConflictResponse({ description: 'Bank already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.bank.create')
  @Post()
  public createBank(
    @Body(ValidationPipe) dto: CreateBankRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<BankResponseDto> {
    return this.bankService.createBank({ ...dto,  createdBy: user.id });
  }

  @ApiOperation({ description: 'Update bank by id' })
  @ApiGlobalResponse(BankResponseDto)
  @ApiConflictResponse({ description: 'Bank already exists' })
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.bank.update')
  @Put('/:id')
  public updateBank(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateBankRequestDto,
  ): Promise<BankResponseDto> {
    return this.bankService.updateBank(id, dto);
  }

  @ApiOperation({ description: 'Update bank by id' })
  @ApiGlobalResponse(BankResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions('admin.access.bank.delete')
  @Delete('/:id')
  public deleteBank(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BankResponseDto> {
    return this.bankService.deleteBank(id);
  }
}
