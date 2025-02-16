import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreatePurchaseQuotationRequestDto } from "./create-purchase-quotation-request.dto";

export class UpdatePurchaseQuotationRequestDto extends CreatePurchaseQuotationRequestDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  updatedBy: string;
}
