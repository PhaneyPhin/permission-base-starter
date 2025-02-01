import { ConflictException } from '@nestjs/common';
import { ErrorType } from '@common/enums';

export class PaymentTermExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'payment-term' exist`,
    });
  }
}
