import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  CreateBankRequestDto,
  UpdateBankRequestDto,
  BankResponseDto,
} from './dtos';
import { BankMapper } from './bank.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { BankEntity } from './bank.entity';
import { Repository } from 'typeorm';
import { BankExistsException } from './bank-exist.exception'; // e.g., custom exception
import { BaseCrudService } from '@common/services/base-crud.service';
import { Filter } from 'typeorm';

export const BANK_FILTER_FIELDS = ['code', 'name', 'address', ];
@Injectable()
export class BankService extends BaseCrudService {
  protected queryName: string = 'bank';
  protected SEARCH_FIELDS = ['code', 'name', 'address', ];
  protected FILTER_FIELDS = BANK_FILTER_FIELDS

  constructor(
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>,
  ) {
    super()
  }
 
  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return BankMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<BankEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('bank.created_at BETWEEN :start AND :end', { start, end });
      }
    };

    return filters
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.bankRepository.createQueryBuilder('bank')
      .leftJoinAndSelect('bank.createdByUser', 'uc')
  }

  getAllBank() {
    return this.bankRepository.createQueryBuilder('bank').select(['id', 'name']).getRawMany()
  }

  /**
   * Get bank by id
   */
  public async getBankById(id: number): Promise<BankResponseDto> {
    const entity = await this.getListQuery()
      .where('warehouse.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return BankMapper.toDto(entity);
  }

  /**
   * Create new bank
   */
  public async createBank(
    dto: CreateBankRequestDto,
  ): Promise<BankResponseDto> {
    try {
      let entity = BankMapper.toCreateEntity(dto);
      entity = await this.bankRepository.save(entity);
      return BankMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new BankExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update bank by id
   */
  public async updateBank(
    id: number,
    dto: UpdateBankRequestDto,
  ): Promise<BankResponseDto> {
    let entity = await this.bankRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = BankMapper.toUpdateEntity(entity, dto);
      entity = await this.bankRepository.save(entity);
      return BankMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new BankExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update bank by id
   */
  public async deleteBank(
    id: number
  ): Promise<BankResponseDto> {
    let entity = await this.bankRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.bankRepository.delete({ id: id });
      return BankMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
