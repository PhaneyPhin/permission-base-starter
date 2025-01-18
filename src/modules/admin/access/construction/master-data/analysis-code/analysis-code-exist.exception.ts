import { ConflictException } from '@nestjs/common';
import { ErrorType } from '@common/enums';

export class AnalysisCodeExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.EXIST,
      message: `There's a  'analysis-code' exist`,
    });
  }
}
