import { StaffProfileEntity } from './staff-profile.entity';
import { UserMapper } from '@admin/access/users/users.mapper';
import {
  CreateStaffProfileRequestDto,
  UpdateStaffProfileRequestDto,
  StaffProfileResponseDto,
} from './dtos';
import { NationalityMapper } from '../master-data/nationality/nationality.mapper';
import { BranchMapper } from '../../branch/branch.mapper';
import { PositionMapper } from '../master-data/position/position.mapper';
import { DepartmentMapper } from '../../department/department.mapper';

export class StaffProfileMapper {
  public static async toDto(entity: StaffProfileEntity): Promise<StaffProfileResponseDto> {
    const dto = new StaffProfileResponseDto();
    dto.id = entity.id;
    dto.active = (entity as any).active; // or your default fields
    dto.staffCode = entity.staffCode;
    dto.nameEn = entity.nameEn;
    dto.nameKh = entity.nameKh;
    dto.sex = entity.sex;
    dto.title = entity.title;
    dto.dateOfBirth = entity.dateOfBirth;
    dto.maritalStatus = entity.maritalStatus;
    dto.religion = entity.religion;
    dto.companyCardNo = entity.companyCardNo;
    dto.identityId = entity.identityId;
    dto.phone1 = entity.phone1;
    dto.phone2 = entity.phone2;
    dto.workingEmail = entity.workingEmail;
    dto.personalEmail = entity.personalEmail;
    dto.placeOfBirth = entity.placeOfBirth;
    dto.hiredDate = entity.hiredDate;
    dto.permanentAddress = entity.permanentAddress;
    dto.currenAddress = entity.currenAddress;
    dto.profileImage = entity.profileImage;
    dto.signatureImage = entity.signatureImage;
    
    if (entity.nationality) {
      dto.nationality = await NationalityMapper.toDto(entity.nationality);
    }
    if (entity.branch) {
      dto.branch = await BranchMapper.toDto(entity.branch);
    }
    if (entity.position) {
      dto.position = await PositionMapper.toDto(entity.position);
    }
    if (entity.department) {
      dto.department = await DepartmentMapper.toDto(entity.department);
    }

     if (entity.createdByUser) {
      dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
    }

    return dto;
  }

  public static toCreateEntity(dto: CreateStaffProfileRequestDto): StaffProfileEntity {
    const entity = new StaffProfileEntity();
    // default fields?
    entity.active = true;
    entity.staffCode = dto.staffCode;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.sex = dto.sex;
    entity.title = dto.title;
    entity.dateOfBirth = dto.dateOfBirth;
    entity.maritalStatus = dto.maritalStatus;
    entity.nationalityId = dto.nationalityId;
    entity.religion = dto.religion;
    entity.companyCardNo = dto.companyCardNo;
    entity.identityId = dto.identityId;
    entity.phone1 = dto.phone1;
    entity.phone2 = dto.phone2;
    entity.workingEmail = dto.workingEmail;
    entity.personalEmail = dto.personalEmail;
    entity.placeOfBirth = dto.placeOfBirth;
    entity.branchId = dto.branchId;
    entity.departmentId = dto.departmentId;
    entity.positionId = dto.positionId;
    entity.hiredDate = dto.hiredDate;
    entity.permanentAddress = dto.permanentAddress;
    entity.currenAddress = dto.currenAddress;
    entity.profileImage = dto.profileImage;
    entity.signatureImage = dto.signatureImage;
    

    return entity;
  }

  public static toUpdateEntity(
    entity: StaffProfileEntity,
    dto: UpdateStaffProfileRequestDto,
  ): StaffProfileEntity {
    entity.staffCode = dto.staffCode;
    entity.nameEn = dto.nameEn;
    entity.nameKh = dto.nameKh;
    entity.sex = dto.sex;
    entity.title = dto.title;
    entity.dateOfBirth = dto.dateOfBirth;
    entity.maritalStatus = dto.maritalStatus;
    entity.nationalityId = dto.nationalityId;
    entity.religion = dto.religion;
    entity.companyCardNo = dto.companyCardNo;
    entity.identityId = dto.identityId;
    entity.phone1 = dto.phone1;
    entity.phone2 = dto.phone2;
    entity.workingEmail = dto.workingEmail;
    entity.personalEmail = dto.personalEmail;
    entity.placeOfBirth = dto.placeOfBirth;
    entity.branchId = dto.branchId;
    entity.departmentId = dto.departmentId;
    entity.positionId = dto.positionId;
    entity.hiredDate = dto.hiredDate;
    entity.permanentAddress = dto.permanentAddress;
    entity.currenAddress = dto.currenAddress;
    entity.profileImage = dto.profileImage;
    entity.signatureImage = dto.signatureImage;
    

    return entity;
  }

  public static toSelectDto(staffProfile: StaffProfileEntity) {
    return {
      nameEn: staffProfile.nameEn,
      nameKh: staffProfile.nameKh,
      id: staffProfile.id
    }
  }
  public static toBulkUpdateResponse(
    updatedIds: number[],
    active: boolean,
  ): { message: string; updatedIds: number[]; active: boolean } {
    return {
      message: `Successfully updated the active status for ${updatedIds.length} staff profiles.`,
      updatedIds,
      active,
    };
  }
}
