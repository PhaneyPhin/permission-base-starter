import { UserResponseDto } from "@admin/access/users/dtos";
import { PaymentMethodResponseDto } from "@modules/admin/access/bank-classification/payment-method/dtos";
import { PaymentTermResponseDto } from "@modules/admin/access/bank-classification/payment-term/dtos";
import { ApiProperty } from "@nestjs/swagger";
import { VendorBankResponseDto } from "../../vendor-bank/dtos";
import { VendorClassResponseDto } from "../../vendor-class/dtos";
import { VendorTypeResponseDto } from "../../vendor-type/dtos";
import { Attachment } from "./attachment.dto";

export class VendorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameKh: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  phone1: string;

  @ApiProperty()
  phone2: string;

  @ApiProperty()
  workingEmail: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  vendorGroupId: string;

  @ApiProperty()
  active: boolean;

  /** RELATIONSHIPS **/

  @ApiProperty({ type: VendorTypeResponseDto })
  vendorType: VendorTypeResponseDto;

  @ApiProperty({ type: VendorClassResponseDto })
  vendorClass: VendorClassResponseDto;

  @ApiProperty({ type: PaymentTermResponseDto })
  paymentTerm: PaymentTermResponseDto;

  @ApiProperty({ type: PaymentMethodResponseDto })
  paymentMethod: PaymentMethodResponseDto;

  @ApiProperty({ type: [VendorBankResponseDto] })
  vendorBanks: VendorBankResponseDto[];

  @ApiProperty({ type: [Attachment] })
  attachments: Attachment[];

  @ApiProperty({ type: UserResponseDto })
  createdByUser: UserResponseDto;

  @ApiProperty({ type: UserResponseDto })
  updatedByUser: UserResponseDto;

  @ApiProperty()
  paymentTermId: number;

  @ApiProperty()
  paymentMethodId: number;

  @ApiProperty()
  vendorTypeId: number;

  @ApiProperty()
  vendorClassId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
