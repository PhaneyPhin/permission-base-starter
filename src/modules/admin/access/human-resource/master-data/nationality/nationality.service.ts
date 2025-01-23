import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateNationalityRequestDto,
  UpdateNationalityRequestDto,
  NationalityResponseDto,
} from './dtos';
import { NationalityMapper } from './nationality.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { NationalityEntity } from './nationality.entity';
import { Repository } from 'typeorm';
import { NationalityExistsException } from './nationality-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const NATIONALITY_FILTER_FIELDS = ['code', 'nameEn', 'nameKh', ];
@Injectable()
export class NationalityService extends BaseCrudService {
  protected queryName: string = 'nationality';
  protected SEARCH_FIELDS = ['code', 'nameEn', 'nameKh', ];
  protected FILTER_FIELDS = NATIONALITY_FILTER_FIELDS

  constructor(
    @InjectRepository(NationalityEntity)
    private nationalityRepository: Repository<NationalityEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return NationalityMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<NationalityEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('nationality.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.nationalityRepository.createQueryBuilder('nationality')
      .leftJoinAndSelect('nationality.createdByUser', 'uc')
  }
  async getAllNationality() {
    return (await this.getListQuery()
      .getMany()).map(NationalityMapper.toSelectDto)
  }

  /**
   * Get nationality by id
   */
  public async getNationalityById(id: number): Promise<NationalityResponseDto> {
    const entity = await this.getListQuery()
      .where('nationality.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return NationalityMapper.toDto(entity);
  }

  /**
   * Create new nationality
   */
  public async createNationality(
    dto: CreateNationalityRequestDto,
  ): Promise<NationalityResponseDto> {
    try {
      let entity = NationalityMapper.toCreateEntity(dto);
      entity = await this.nationalityRepository.save(entity);
      return NationalityMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new NationalityExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update nationality by id
   */
  public async updateNationality(
    id: number,
    dto: UpdateNationalityRequestDto,
  ): Promise<NationalityResponseDto> {
    let entity = await this.nationalityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = NationalityMapper.toUpdateEntity(entity, dto);
      entity = await this.nationalityRepository.save(entity);
      return NationalityMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new NationalityExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update nationality by id
   */
  public async deleteNationality(
    id: number
  ): Promise<NationalityResponseDto> {
    let entity = await this.nationalityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.nationalityRepository.delete({ id: id });
      return NationalityMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
