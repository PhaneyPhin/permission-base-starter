import { UserMapper } from "@admin/access/users/users.mapper";
import { PaymentMethodResponseDto } from "../../bank-classification/payment-method/dtos";
import { PaymentMethodEntity } from "../../bank-classification/payment-method/payment-method.entity";
import { PaymentMethodMapper } from "../../bank-classification/payment-method/payment-method.mapper";
import { PaymentTermResponseDto } from "../../bank-classification/payment-term/dtos";
import { PaymentTermEntity } from "../../bank-classification/payment-term/payment-term.entity";
import { PaymentTermMapper } from "../../bank-classification/payment-term/payment-term.mapper";
import { VendorBankEntity } from "../vendor-bank/vendor-bank.entity";
import { VendorBankMapper } from "../vendor-bank/vendor-bank.mapper";
import { VendorClassResponseDto } from "../vendor-class/dtos";
import { VendorClassEntity } from "../vendor-class/vendor-class.entity";
import { VendorClassMapper } from "../vendor-class/vendor-class.mapper";
import { VendorTypeResponseDto } from "../vendor-type/dtos";
import { VendorTypeEntity } from "../vendor-type/vendor-type.entity";
import { VendorTypeMapper } from "../vendor-type/vendor-type.mapper";
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from "./dtos";
import { VendorEntity } from "./vendor.entity";

export class VendorMapper {
  public static async toDto(entity: VendorEntity): Promise<VendorResponseDto> {
    const dto = new VendorResponseDto();
    console.log(entity);
    dto.id = entity.id;
    dto.code = entity.code;
    dto.status = entity.status;
    dto.active = entity.active;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.contactPerson = entity.contactPerson;
    dto.phone1 = entity.phone1;
    dto.phone2 = entity.phone2;
    dto.workingEmail = entity.workingEmail;
    dto.email = entity.email;
    dto.address = entity.address;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    // Convert Related Entities to IDs
    dto.paymentTermId = entity.paymentTerm?.id;
    dto.paymentMethodId = entity.paymentMethod?.id;
    dto.vendorTypeId = entity.vendorType?.id;
    dto.vendorClassId = entity.vendorClass?.id;
    dto.vendorGroupId = entity.vendorGroupId;

    const [vendorType, vendorClass, paymentMethod, paymentTerm] =
      await Promise.all([
        entity.vendorType
          ? VendorTypeMapper.toDto(entity.vendorType)
          : new VendorTypeResponseDto(),
        entity.vendorClass
          ? VendorClassMapper.toDto(entity.vendorClass)
          : new VendorClassResponseDto(),
        entity.paymentMethod
          ? PaymentMethodMapper.toDto(entity.paymentMethod)
          : new PaymentMethodResponseDto(),
        entity.paymentTerm
          ? PaymentTermMapper.toDto(entity.paymentTerm)
          : new PaymentTermResponseDto(),
      ]);
    dto.vendorType = vendorType;
    dto.vendorClass = vendorClass;
    dto.paymentMethod = paymentMethod;
    dto.paymentTerm = paymentTerm;

    // Handle Attachments (stored as JSON)
    dto.attachments = entity.attachments ? [...entity.attachments] : [];

    // Handle VendorBanks (1-to-Many)
    if (entity.vendorBanks) {
      dto.vendorBanks = await Promise.all(
        entity.vendorBanks.map((bank) => VendorBankMapper.toDto(bank))
      );
    }

    // Map Created By User
    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    if (entity.updatedByUser) {
      dto.updatedByUser = await UserMapper.toDto(entity.updatedByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateVendorRequestDto): VendorEntity {
    const entity = new VendorEntity();

    entity.code = dto.code;
    entity.status = dto.status;
    entity.active = true;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phone1 = dto.phone1;
    entity.phone2 = dto.phone2;
    entity.workingEmail = dto.workingEmail;
    entity.email = dto.email;
    entity.address = dto.address;
    entity.createdBy = dto.createdBy;

    // Assign Attachments (stored as JSON)
    entity.attachments = dto.attachments ? [...dto.attachments] : [];

    // Assign Relationships (Many-to-One)
    if (dto.paymentTermId) {
      entity.paymentTerm = new PaymentTermEntity();
      entity.paymentTerm.id = dto.paymentTermId;
    }
    if (dto.paymentMethodId) {
      entity.paymentMethod = new PaymentMethodEntity();
      entity.paymentMethod.id = dto.paymentMethodId;
    }
    if (dto.vendorTypeId) {
      entity.vendorType = new VendorTypeEntity();
      entity.vendorType.id = dto.vendorTypeId;
    }
    if (dto.vendorClassId) {
      entity.vendorClass = new VendorClassEntity();
      entity.vendorClass.id = dto.vendorClassId;
    }

    // Assign VendorBanks (1-to-Many)
    if (dto.vendorBanks && dto.vendorBanks.length > 0) {
      entity.vendorBanks = dto.vendorBanks.map((bankDto) => {
        const bankEntity = new VendorBankEntity();
        return VendorBankMapper.toCreateEntity(bankDto);
      });
    }

    return entity;
  }

  public static toUpdateEntity(
    entity: VendorEntity,
    dto: UpdateVendorRequestDto
  ): VendorEntity {
    entity.code = dto.code;
    entity.status = dto.status;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phone1 = dto.phone1;
    entity.phone2 = dto.phone2;
    entity.workingEmail = dto.workingEmail;
    entity.email = dto.email;
    entity.address = dto.address;
    entity.updatedBy = dto.updatedBy;

    // Update Relationships (Many-to-One)
    if (dto.paymentTermId) {
      entity.paymentTerm = new PaymentTermEntity();
      entity.paymentTerm.id = dto.paymentTermId;
    }
    if (dto.paymentMethodId) {
      entity.paymentMethod = new PaymentMethodEntity();
      entity.paymentMethod.id = dto.paymentMethodId;
    }
    if (dto.vendorTypeId) {
      entity.vendorType = new VendorTypeEntity();
      entity.vendorType.id = dto.vendorTypeId;
    }
    if (dto.vendorClassId) {
      entity.vendorClass = new VendorClassEntity();
      entity.vendorClass.id = dto.vendorClassId;
    }

    // Update Attachments
    entity.attachments = dto.attachments
      ? [...dto.attachments]
      : entity.attachments;

    if (dto.vendorBanks && dto.vendorBanks.length > 0) {
      entity.vendorBanks = dto.vendorBanks.map((bankDto) => {
        let bankEntity = null;
        if (bankDto.id) {
          bankEntity = VendorBankMapper.toUpdateEntity(
            new VendorBankEntity({ id: bankDto.id }),
            bankDto
          );
        } else {
          bankEntity = VendorBankMapper.toCreateEntity(bankDto);
        }

        bankEntity.vendor = new VendorEntity({ id: entity.id }); // ✅ Ensure vendor reference is set
        return bankEntity;
      });
    }
    return entity;
  }
}
