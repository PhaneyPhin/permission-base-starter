import { CreatePurchaseReceiptItemRequestDto } from "./create-purchase-receipt-item-request.dto";

export class UpdatePurchaseReceiptItemRequestDto extends CreatePurchaseReceiptItemRequestDto {
  updatedBy: string;
}
