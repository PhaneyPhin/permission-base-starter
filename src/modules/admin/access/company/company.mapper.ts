import { UserMapper } from '@admin/access/users/users.mapper';
import { CompanyEntity } from './company.entity';
import {
  CompanyResponseDto,
  CreateCompanyRequestDto,
  UpdateCompanyRequestDto,
} from './dtos';

export class CompanyMapper {
  public static async toDto(entity: CompanyEntity): Promise<CompanyResponseDto> {
    const dto = new CompanyResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.email = entity.email;
    dto.website = entity.website;
    dto.addressEn = entity.addressEn;
    dto.addressKh = entity.addressKh;
    dto.logo = entity.logo;
    dto.code = entity.code
    dto.logoUrl = await entity.getLogoUrl()

    if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateCompanyRequestDto): CompanyEntity {
    const entity = new CompanyEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.email = dto.email;
    entity.website = dto.website;
    entity.addressEn = dto.addressEn;
    entity.addressKh = dto.addressKh;
    entity.createdBy = dto.createdBy;
    entity.logo = dto.logo;
    
    return entity;
  }

  public static toUpdateEntity(
    entity: CompanyEntity,
    dto: UpdateCompanyRequestDto,
  ): CompanyEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.email = dto.email;
    entity.website = dto.website;
    entity.addressEn = dto.addressEn;
    entity.addressKh = dto.addressKh;
    entity.logo = dto.logo;

    return entity;
  }
}
