import { BranchEntity } from './branch.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateBranchRequestDto,
  UpdateBranchRequestDto,
  BranchResponseDto,
} from './dtos';

export class BranchMapper {
  public static async toDto(entity: BranchEntity): Promise<BranchResponseDto> {
    const dto = new BranchResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.contactPerson = entity.contactPerson;
    dto.phoneNumber = entity.phoneNumber;
    dto.addressEn = entity.addressEn;
    dto.addressKh = entity.addressKh;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateBranchRequestDto): BranchEntity {
    const entity = new BranchEntity();
    // default fields?
    entity.active = true;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phoneNumber = dto.phoneNumber;
    entity.addressEn = dto.addressEn;
    entity.addressKh = dto.addressKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: BranchEntity,
    dto: UpdateBranchRequestDto,
  ): BranchEntity {
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.contactPerson = dto.contactPerson;
    entity.phoneNumber = dto.phoneNumber;
    entity.addressEn = dto.addressEn;
    entity.addressKh = dto.addressKh;
    entity.description = dto.description;
    

    return entity;
  }
}
