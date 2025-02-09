import { CreateVendorRequestDto } from "./create-vendor-request.dto";

export class UpdateVendorRequestDto extends CreateVendorRequestDto {
  updatedBy: string;
}
