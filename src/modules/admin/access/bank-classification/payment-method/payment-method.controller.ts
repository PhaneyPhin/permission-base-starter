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
  CreatePaymentMethodRequestDto,
  PaymentMethodResponseDto,
  UpdatePaymentMethodRequestDto,
} from "./dtos";
import {
  PAYMENT_METHOD_FILTER_FIELDS,
  PaymentMethodService,
} from "./payment-method.service";

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
import { PaymentMethodEntity } from "./payment-method.entity";

@ApiTags("PaymentMethod")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "access/payment-method",
  version: "1",
})
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ description: "Get a paginated payment-method list" })
  @ApiPaginatedResponse(PaymentMethodResponseDto)
  @ApiQuery({ name: "search", type: "string", required: false, example: "" })
  @ApiFields(PAYMENT_METHOD_FILTER_FIELDS)
  @Permissions(
    "admin.access.payment-method.read",
    "admin.access.payment-method.create",
    "admin.access.payment-method.update"
  )
  @Get()
  public getPaymentMethods(
    @PaginationParams() pagination: PaginationRequest
  ): Promise<PaginationResponseDto<PaymentMethodResponseDto>> {
    return this.paymentMethodService.list<
      PaymentMethodEntity,
      PaymentMethodResponseDto
    >(pagination);
  }

  @ApiOperation({ description: "Get all payment-method list form select form" })
  @Permissions(
    "admin.access.payment-method.read",
    "admin.access.payment-method.create",
    "admin.access.payment-method.update"
  )
  @Get("/select-options")
  public getAllPaymentMethodForSelect(): Promise<PaymentMethodEntity[]> {
    return this.paymentMethodService.getAllPaymentMethod();
  }

  @ApiOperation({ description: "Get payment-method by id" })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  @Permissions(
    "admin.access.payment-method.read",
    "admin.access.payment-method.create",
    "admin.access.payment-method.update"
  )
  @Get("/:id")
  public getPaymentMethodById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PaymentMethodResponseDto> {
    return this.paymentMethodService.getPaymentMethodById(id);
  }

  @ApiOperation({ description: "Create new payment-method" })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  @ApiConflictResponse({ description: "PaymentMethod already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-method.create")
  @Post()
  public createPaymentMethod(
    @Body(ValidationPipe) dto: CreatePaymentMethodRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<PaymentMethodResponseDto> {
    return this.paymentMethodService.createPaymentMethod({
      ...dto,
      createdBy: user.id,
    });
  }

  @ApiOperation({ description: "Update payment-method by id" })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  @ApiConflictResponse({ description: "PaymentMethod already exists" })
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-method.update")
  @Put("/:id")
  public updatePaymentMethod(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePaymentMethodRequestDto
  ): Promise<PaymentMethodResponseDto> {
    return this.paymentMethodService.updatePaymentMethod(id, dto);
  }

  @ApiOperation({ description: "Update payment-method by id" })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  @UseGuards(SuperUserGuard)
  @Permissions("admin.access.payment-method.delete")
  @Delete("/:id")
  public deletePaymentMethod(
    @Param("id", ParseIntPipe) id: number
  ): Promise<PaymentMethodResponseDto> {
    return this.paymentMethodService.deletePaymentMethod(id);
  }
}
