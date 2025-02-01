import { UserMapper } from "@admin/access/users/users.mapper";
import { BankEntity } from "./bank.entity";
import {
  BankResponseDto,
  CreateBankRequestDto,
  UpdateBankRequestDto,
} from "./dtos";

export class BankMapper {
  public static async toDto(entity: BankEntity): Promise<BankResponseDto> {
    const dto = new BankResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.name = entity.name;
    dto.address = entity.address;
    dto.countryCode = entity.countryCode;

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateBankRequestDto): BankEntity {
    const entity = new BankEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.name = dto.name;
    entity.address = dto.address;
    entity.countryCode = dto.countryCode;

    return entity;
  }

  public static toUpdateEntity(
    entity: BankEntity,
    dto: UpdateBankRequestDto
  ): BankEntity {
    entity.name = dto.name;
    entity.address = dto.address;

    return entity;
  }
}
