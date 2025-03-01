import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";
import { CreatePurchaseOrderRequestDto } from "./create-purchase-order-request.dto";

export class UpdatePurchaseOrderRequestDto extends CreatePurchaseOrderRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  updatedBy: string;
}
