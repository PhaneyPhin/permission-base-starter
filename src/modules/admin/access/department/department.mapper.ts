import { DepartmentEntity } from './department.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
  DepartmentResponseDto,
} from './dtos';

export class DepartmentMapper {
  public static async toDto(entity: DepartmentEntity): Promise<DepartmentResponseDto> {
    const dto = new DepartmentResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.description = entity.description;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateDepartmentRequestDto): DepartmentEntity {
    const entity = new DepartmentEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.description = dto.description;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: DepartmentEntity,
    dto: UpdateDepartmentRequestDto,
  ): DepartmentEntity {
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.code = dto.code;
    entity.description = dto.description;
    

    return entity;
  }
}
