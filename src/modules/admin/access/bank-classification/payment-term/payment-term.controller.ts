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
  CreatePaymentTermRequestDto,
  PaymentTermResponseDto,
  UpdatePaymentTermRequestDto,
} from "./dtos";
import {
  PAYMENT_TERM_FILTER_FIELDS,
  PaymentTermService,
} from "./payment-term.service";

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
import { PaymentTermEntity } from "./payment-term.entity";

@ApiTags("PaymentTerm")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/payment-term",
  version: "1",
})
export class PaymentTermController {
  constructor(private readonly paymentTermService: PaymentTermService) {}

  @ApiOperation({ description: "Get a paginated payment-term list" })
  @ApiPaginatedResponse(PaymentTermResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(PAYMENT_TERM_FILTER_FIELDS)
  @Permissions(
    "admin.access.payment-term.read",
    "admin.access.payment-term.create",
    "admin.access.payment-term.update"
  )
  @Get()
  public getPaymentTerms(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PaymentTermResponseDto>> {
    return this.paymentTermService.list<
      PaymentTermEntity,
      PaymentTermResponseDto
    >(pagination);
  }

  @ApiOperation({ description: "Get all payment-term list form select form" })
  @Permissions(
    "admin.access.payment-term.read",
    "admin.access.payment-term.create",
    "admin.access.payment-term.update"
  )
  @Get("/select-options")
  public getAllPaymentTermForSelect(): Promise<PaymentTermEntity[]> {
    return this.paymentTermService.getAllPaymentTerm();
  }

  @ApiOperation({ description: "Get payment-term by id" })
  @ApiGlobalResponse(PaymentTermResponseDto)
  @Permissions(
    "admin.access.payment-term.read",
    "admin.access.payment-term.create",
    "admin.access.payment-term.update"
  )
  @Get("/:id")
  public getPaymentTermById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PaymentTermResponseDto> {
    return this.paymentTermService.getPaymentTermById(id);
  }

  @ApiOperation({ description: "Create new payment-term" })
  @ApiGlobalResponse(PaymentTermResponseDto)
  @ApiConflictResponse({ description: "PaymentTerm already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-term.create")
  @Post()
  public createPaymentTerm(
    @Body(ValidationPipe) dto: CreatePaymentTermRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PaymentTermResponseDto> {
    return this.paymentTermService.createPaymentTerm({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update payment-term by id" })
  @ApiGlobalResponse(PaymentTermResponseDto)
  @ApiConflictResponse({ description: "PaymentTerm already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-term.update")
  @Put("/:id")
  public updatePaymentTerm(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePaymentTermRequestDto
  ): Promise<PaymentTermResponseDto> {
    return this.paymentTermService.updatePaymentTerm(id, dto);
  }

  @ApiOperation({ description: "Update payment-term by id" })
  @ApiGlobalResponse(PaymentTermResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-term.delete")
  @Delete("/:id")
  public deletePaymentTerm(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PaymentTermResponseDto> {
    return this.paymentTermService.deletePaymentTerm(id);
  }
}
