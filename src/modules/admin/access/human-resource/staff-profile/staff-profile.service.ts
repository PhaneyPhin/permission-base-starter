import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateStaffProfileRequestDto,
  UpdateStaffProfileRequestDto,
  StaffProfileResponseDto,
} from './dtos';
import { StaffProfileMapper } from './staff-profile.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { StaffProfileEntity } from './staff-profile.entity';
import { Repository } from 'typeorm';
import { StaffProfileExistsException } from './staff-profile-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter, In } from 'typeorm';
import { StaffStatus } from './enams/staff-status-enum';

export const STAFF_PROFILE_FILTER_FIELDS = ['staffCode', 'nameEn', 'nameKh', 'sex', 'title', 'dateOfBirth', 'maritalStatus', 'religion', 'companyCardNo', 'identityId', 'phone1', 'phone2', 'workingEmail', 'personalEmail', 'placeOfBirth', 'hiredDate', 'permanentAddress', 'currenAddress', 'profileImage', 'signatureImage' ];
@Injectable()
export class StaffProfileService extends BaseCrudService {
  protected queryName: string = 'staffProfile';
  protected SEARCH_FIELDS = ['staffCode', 'nameEn', 'nameKh', 'sex', 'title', 'dateOfBirth', 'maritalStatus', 'religion', 'companyCardNo', 'identityId', 'phone1', 'phone2', 'workingEmail', 'personalEmail', 'placeOfBirth', 'hiredDate', 'permanentAddress', 'currenAddress', 'profileImage', 'signatureImage' ];
  protected FILTER_FIELDS = STAFF_PROFILE_FILTER_FIELDS

  constructor(
    @InjectRepository(StaffProfileEntity)
    private staffProfileRepository: Repository<StaffProfileEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return StaffProfileMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<StaffProfileEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('staffProfile.created_at BETWEEN :start AND :end', { start, end });
      },
      branch: (query, value) => {
        return query.andWhere('branch.name_en ILIKE %branch% or branch.name_kh ILIKE %branch%', { branch: value })
      },
      position: (query, value) => {
        return query.andWhere('position.name_en ILIKE %position% or position.name_kh ILIKE %position%', { position: value })
      },
      nationality: (query, value) => {
        return query.andWhere('nationality.name_en ILIKE %nationality% or nationality.name_kh ILIKE %nationality%', { nationality: value })
      },
      department: (query, value) => {
        return query.andWhere('department.name_en ILIKE %department% or department.name_kh ILIKE %department%', { department: value })
      }
    };

    return filters
  }
  /** Require for base query list of feature */
  protected getListQuery() {
    return this.staffProfileRepository.createQueryBuilder('staffProfile')
      .leftJoinAndSelect('staffProfile.createdByUser', 'uc')
      .leftJoinAndSelect('staffProfile.branch', 'branch')
      .leftJoinAndSelect('staffProfile.position', 'position')
      .leftJoinAndSelect('staffProfile.nationality', 'nationality')
      .leftJoinAndSelect('staffProfile.department', 'department')
  }
  async getAllStaffProfile() {
    return (await this.getListQuery()
      .getMany()).map(StaffProfileMapper.toSelectDto)
  }

  /**
   * Get staff-profile by id
   */
  public async getStaffProfileById(id: number): Promise<StaffProfileResponseDto> {
    const entity = await this.getListQuery()
      .where('staffProfile.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return StaffProfileMapper.toDto(entity);
  }

  /**
   * Create new staff-profile
   */
  public async createStaffProfile(
    dto: CreateStaffProfileRequestDto,
  ): Promise<StaffProfileResponseDto> {
    try {
      let entity = StaffProfileMapper.toCreateEntity(dto);
      entity = await this.staffProfileRepository.save(entity);
      return StaffProfileMapper.toDto(entity);
    } catch (error) {
      console.error('Error in createStaffProfile:', error);
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new StaffProfileExistsException(dto.staffCode);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update staff-profile by id
   */
  public async updateStaffProfile(
    id: number,
    dto: UpdateStaffProfileRequestDto,
  ): Promise<StaffProfileResponseDto> {
    let entity = await this.staffProfileRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = StaffProfileMapper.toUpdateEntity(entity, dto);
      entity = await this.staffProfileRepository.save(entity);
      return StaffProfileMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new StaffProfileExistsException(dto.staffCode);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update staff-profile by id
   */
  public async deleteStaffProfile(
    id: number
  ): Promise<StaffProfileResponseDto> {
    let entity = await this.staffProfileRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.staffProfileRepository.delete({ id: id });
      return StaffProfileMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  public async activateStaffProfiles(ids: number[]): Promise<number[]> {
    return this.updateStaffProfilesStatus(ids, StaffStatus.ACTIVE);
  }
  
  public async deactivateStaffProfiles(ids: number[]): Promise<number[]> {
    return this.updateStaffProfilesStatus(ids, StaffStatus.INACTIVE);
  }
  
  private async updateStaffProfilesStatus(
    ids: number[],
    status: StaffStatus,
  ): Promise<number[]> {
    const profiles = await this.staffProfileRepository.findBy({
      id: In(ids),
    });
  
    const foundIds = profiles.map((profile) => profile.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));
  
    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Staff profiles with IDs ${missingIds.join(', ')} not found.`,
      );
    }
  
    await this.staffProfileRepository
      .createQueryBuilder()
      .update()
      .set({ status })
      .whereInIds(ids)
      .execute();
  
    return foundIds;
  }   
  
}
