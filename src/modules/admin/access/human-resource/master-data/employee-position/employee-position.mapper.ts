import { EmployeePositionEntity } from './employee-position.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateEmployeePositionRequestDto,
  UpdateEmployeePositionRequestDto,
  EmployeePositionResponseDto,
} from './dtos';

export class EmployeePositionMapper {
  public static async toDto(entity: EmployeePositionEntity): Promise<EmployeePositionResponseDto> {
    const dto = new EmployeePositionResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.code = entity.code;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateEmployeePositionRequestDto): EmployeePositionEntity {
    const entity = new EmployeePositionEntity();
    // default fields?
    entity.active = true;
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: EmployeePositionEntity,
    dto: UpdateEmployeePositionRequestDto,
  ): EmployeePositionEntity {
    entity.code = dto.code;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    

    return entity;
  }

  public static toSelectDto(employeePosition: EmployeePositionEntity) {
    return {
      nameEn: employeePosition.nameEn,
      nameKh: employeePosition.nameKh,
      id: employeePosition.id
    }
  }
}
