import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterPlanRequestDto } from './create-master-plan-request.dto';

export class PartialUpdateMasterPlanRequestDto extends PartialType(CreateMasterPlanRequestDto) {}