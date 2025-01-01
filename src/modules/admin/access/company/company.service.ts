import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateCompanyRequestDto,
  UpdateCompanyRequestDto,
  CompanyResponseDto,
} from './dtos';
import { CompanyMapper } from './company.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { CompanyExistsException } from './company-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';
import { MinioService } from 'src/minio/minio.service';

export const COMPANY_FILTER_FIELDS = ['nameEn', 'nameKh', 'email', 'website', 'addressEn', 'addressKh', 'logo', ];

@Injectable()
export class CompanyService extends BaseCrudService {
  protected queryName: string = 'company';
  protected SEARCH_FIELDS = ['nameEn', 'nameKh', 'email', 'website', 'addressEn', 'addressKh', 'logo', ];
  protected FILTER_FIELDS = COMPANY_FILTER_FIELDS

  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private readonly minioService: MinioService,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return CompanyMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<CompanyEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('company.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.companyRepository.createQueryBuilder('company')
      .leftJoinAndSelect('company.createdByUser', 'uc')
  }

  getAllCompany() {
    return this.companyRepository.createQueryBuilder('company').select(['id', 'name']).getRawMany()
  }

  /**
   * Get company by id
   */
  public async getCompanyById(id: number): Promise<CompanyResponseDto> {
    const entity = await this.getListQuery()
      .where('company.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return CompanyMapper.toDto(entity);
  }

  /**
   * Create new company
   */
  public async createCompany(
    dto: CreateCompanyRequestDto,
  ): Promise<CompanyResponseDto> {
    try {
      let entity = CompanyMapper.toCreateEntity(dto);
      entity = await this.companyRepository.save(entity);
      return CompanyMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new CompanyExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update company by id
   */
  public async updateCompany(
    id: number,
    dto: UpdateCompanyRequestDto,
  ): Promise<CompanyResponseDto> {
    let entity = await this.companyRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = CompanyMapper.toUpdateEntity(entity, dto);
      entity = await this.companyRepository.save(entity);
      return CompanyMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new CompanyExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update company by id
   */
  public async deleteCompany(
    id: number
  ): Promise<CompanyResponseDto> {
    let entity = await this.companyRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.companyRepository.delete({ id: id });
      return CompanyMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
