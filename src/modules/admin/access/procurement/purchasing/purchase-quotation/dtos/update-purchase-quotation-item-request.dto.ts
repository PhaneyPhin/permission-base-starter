import { CreatePurchaseQuotationItemRequestDto } from "./create-purchase-quotation-item-request.dto";

export class UpdatePurchaseQuotationItemRequestDto extends CreatePurchaseQuotationItemRequestDto {
  updatedBy: string;
}
