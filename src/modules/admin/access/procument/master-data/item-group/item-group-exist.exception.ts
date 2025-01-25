import { ConflictException } from '@nestjs/common';
import { ErrorType } from '@common/enums';

export class ItemGroupExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'item-group' exist`,
    });
  }
}
