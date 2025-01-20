import { EmployeeEntity } from './employee.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
  EmployeeResponseDto,
} from './dtos';

export class EmployeeMapper {
  public static async toDto(entity: EmployeeEntity): Promise<EmployeeResponseDto> {
    const dto = new EmployeeResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.employeeCode = entity.employeeCode;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.fullName = `${entity.firstName} ${entity.lastName}`
    dto.gender = entity.gender;
    dto.dateOfBirth = entity.dateOfBirth;
    dto.contactNumber = entity.contactNumber;
    dto.emailAddress = entity.emailAddress;
    dto.departmentId = entity.departmentId;
    dto.positionId = entity.positionId;
    dto.hireDate = entity.hireDate;
    dto.remark = entity.remark;
    

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateEmployeeRequestDto): EmployeeEntity {
    const entity = new EmployeeEntity();
    // default fields?
    entity.active = true;
    entity.employeeCode = dto.employeeCode;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.gender = dto.gender;
    entity.dateOfBirth = dto.dateOfBirth;
    entity.contactNumber = dto.contactNumber;
    entity.emailAddress = dto.emailAddress;
    entity.departmentId = dto.departmentId;
    entity.positionId = dto.positionId;
    entity.hireDate = dto.hireDate;
    entity.remark = dto.remark;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: EmployeeEntity,
    dto: UpdateEmployeeRequestDto,
  ): EmployeeEntity {
    entity.employeeCode = dto.employeeCode;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.gender = dto.gender;
    entity.dateOfBirth = dto.dateOfBirth;
    entity.contactNumber = dto.contactNumber;
    entity.emailAddress = dto.emailAddress;
    entity.departmentId = dto.departmentId;
    entity.positionId = dto.positionId;
    entity.hireDate = dto.hireDate;
    entity.remark = dto.remark;
    

    return entity;
  }
}
