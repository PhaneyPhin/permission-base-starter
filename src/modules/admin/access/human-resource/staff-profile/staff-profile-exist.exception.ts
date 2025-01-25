import { ConflictException } from '@nestjs/common';
import { ErrorType } from '@common/enums';

export class StaffProfileExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'staff-profile' exist`,
    });
  }
}
