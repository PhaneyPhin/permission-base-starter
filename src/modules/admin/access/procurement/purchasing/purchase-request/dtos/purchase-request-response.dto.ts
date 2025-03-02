import { UserResponseDto } from "@admin/access/users/dtos";
import { BranchResponseDto } from "@modules/admin/access/branch/dtos";
import { AnalysisCodeResponseDto } from "@modules/admin/access/construction/master-data/analysis-code/dtos";
import { DepartmentResponseDto } from "@modules/admin/access/department/dtos";
import { StaffProfileResponseDto } from "@modules/admin/access/human-resource/staff-profile/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { RequestTypeResponseDto } from "../../../master-data/purchasing/request-type/dtos";
import { PurchaseRequestItemResponseDto } from "./purchase-request-item-response.dto";

export class PurchaseRequestResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  requestNumber: string;

  @ApiProperty()
  requestTypeId: number;

  @ApiProperty({ type: RequestTypeResponseDto })
  requestType: RequestTypeResponseDto;

  @ApiProperty()
  departmentId: number;

  @ApiProperty({ type: DepartmentResponseDto })
  department: DepartmentResponseDto;

  @ApiProperty()
  branchId: number;

  @ApiProperty({ type: BranchResponseDto })
  branch: BranchResponseDto;

  @ApiProperty()
  projectId: number;

  @ApiProperty({ type: AnalysisCodeResponseDto })
  project: AnalysisCodeResponseDto;

  @ApiProperty()
  requestDate: Date;

  @ApiProperty()
  requiredDate: Date;

  @ApiProperty()
  totalQty?: number;

  @ApiProperty()
  openQty?: number;

  @ApiProperty()
  receiptQty?: number;

  @ApiProperty()
  totalCost?: number;

  @ApiProperty()
  totalEstimatedPrice?: number;

  @ApiProperty()
  requestedById?: number;

  @ApiProperty()
  priority?: string;

  @ApiProperty()
  currencyCode: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  requestedBy: StaffProfileResponseDto;

  @ApiProperty()
  createdByUser: UserResponseDto;

  @ApiProperty()
  costCenterBy: DepartmentResponseDto;

  @ApiProperty({ type: [PurchaseRequestItemResponseDto] })
  items: PurchaseRequestItemResponseDto[];
}
