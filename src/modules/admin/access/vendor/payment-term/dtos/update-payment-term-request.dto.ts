import { CreatePaymentTermRequestDto } from "./create-payment-term-request.dto";

export class UpdatePaymentTermRequestDto extends CreatePaymentTermRequestDto {
  updatedBy: string;
}
