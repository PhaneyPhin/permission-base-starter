import { ConflictException } from '@nestjs/common';
import { ErrorType } from '@common/enums';

export class MasterPlanExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'master-plan' exist`,
    });
  }
}
