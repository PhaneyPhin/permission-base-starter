import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateVendorBankRequestDto,
  UpdateVendorBankRequestDto,
  VendorBankResponseDto,
} from './dtos';
import { VendorBankMapper } from './vendor-bank.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { VendorBankEntity } from './vendor-bank.entity';
import { Repository } from 'typeorm';
import { VendorBankExistsException } from './vendor-bank-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const VENDOR-BANK_FILTER_FIELDS = ['vendorId', 'bankId', 'accountNumber', 'accountHolderName', 'currency', ];
@Injectable()
export class VendorBankService extends BaseCrudService {
  protected queryName: string = 'vendorBank';
  protected SEARCH_FIELDS = ['vendorId', 'bankId', 'accountNumber', 'accountHolderName', 'currency', ];
  protected FILTER_FIELDS = VENDOR-BANK_FILTER_FIELDS

  constructor(
    @InjectRepository(VendorBankEntity)
    private vendorBankRepository: Repository<VendorBankEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return VendorBankMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<VendorBankEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('vendorBank.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.vendorBankRepository.createQueryBuilder('vendorBank')
      .leftJoinAndSelect('vendorBank.createdByUser', 'uc')
  }

  getAllVendorBank() {
    return this.vendorBankRepository.createQueryBuilder('vendorBank').select(['id', 'name']).getRawMany()
  }

  /**
   * Get vendor-bank by id
   */
  public async getVendorBankById(id: number): Promise<VendorBankResponseDto> {
    const entity = await this.getListQuery()
      .where('warehouse.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return VendorBankMapper.toDto(entity);
  }

  /**
   * Create new vendor-bank
   */
  public async createVendorBank(
    dto: CreateVendorBankRequestDto,
  ): Promise<VendorBankResponseDto> {
    try {
      let entity = VendorBankMapper.toCreateEntity(dto);
      entity = await this.vendorBankRepository.save(entity);
      return VendorBankMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorBankExistsException(dto.vendorId);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor-bank by id
   */
  public async updateVendorBank(
    id: number,
    dto: UpdateVendorBankRequestDto,
  ): Promise<VendorBankResponseDto> {
    let entity = await this.vendorBankRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = VendorBankMapper.toUpdateEntity(entity, dto);
      entity = await this.vendorBankRepository.save(entity);
      return VendorBankMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorBankExistsException(dto.vendorId);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor-bank by id
   */
  public async deleteVendorBank(
    id: number
  ): Promise<VendorBankResponseDto> {
    let entity = await this.vendorBankRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.vendorBankRepository.delete({ id: id });
      return VendorBankMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
