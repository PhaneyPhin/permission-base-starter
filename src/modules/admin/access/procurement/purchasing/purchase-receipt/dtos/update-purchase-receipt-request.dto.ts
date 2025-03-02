import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreatePurchaseReceiptRequestDto } from "./create-purchase-receipt-request.dto";

export class UpdatePurchaseReceiptRequestDto extends CreatePurchaseReceiptRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  updatedBy: string;
}
