import { CreatePurchaseOrderItemRequestDto } from './create-purchase-order-item-request.dto';

export class UpdatePurchaseOrderItemRequestDto extends CreatePurchaseOrderItemRequestDto {
  updatedBy: string;
}
