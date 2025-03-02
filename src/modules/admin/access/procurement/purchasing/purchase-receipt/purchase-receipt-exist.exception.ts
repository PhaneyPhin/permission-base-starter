import { ErrorType } from "@common/enums";
import { ConflictException } from "@nestjs/common";

export class PurchaseReceiptExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'purchase-receipt' exist`,
    });
  }
}
