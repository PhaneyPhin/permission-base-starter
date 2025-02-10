import { BaseCrudService } from "@common/services/base-crud.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleError } from "@utils/handle-error";
import { TimeoutError } from "rxjs";
import { Filter, Repository } from "typeorm";
import {
  CreatePaymentTermRequestDto,
  PaymentTermResponseDto,
  UpdatePaymentTermRequestDto,
} from "./dtos";
import { PaymentTermEntity } from "./payment-term.entity";
import { PaymentTermMapper } from "./payment-term.mapper";

export const PAYMENT_TERM_FILTER_FIELDS = ["name", "daysDue", "description"];
@Injectable()
export class PaymentTermService extends BaseCrudService {
  protected queryName: string = "paymentTerm";
  protected SEARCH_FIELDS = ["name", "daysDue", "description"];
  protected FILTER_FIELDS = PAYMENT_TERM_FILTER_FIELDS;

  constructor(
    @InjectRepository(PaymentTermEntity)
    private paymentTermRepository: Repository<PaymentTermEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PaymentTermMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PaymentTermEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "paymentTerm.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.paymentTermRepository
      .createQueryBuilder("paymentTerm")
      .leftJoinAndSelect("paymentTerm.createdByUser", "uc");
  }

  getAllPaymentTerm() {
    return this.paymentTermRepository.find({
      select: { id: true, name: true },
    });
  }

  /**
   * Get payment-term by id
   */
  public async getPaymentTermById(id: number): Promise<PaymentTermResponseDto> {
    const entity = await this.getListQuery()
      .where("paymentTerm.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return PaymentTermMapper.toDto(entity);
  }

  /**
   * Create new payment-term
   */
  public async createPaymentTerm(
    dto: CreatePaymentTermRequestDto
  ): Promise<PaymentTermResponseDto> {
    try {
      let entity = PaymentTermMapper.toCreateEntity(dto);
      entity = await this.paymentTermRepository.save(entity);
      return PaymentTermMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update payment-term by id
   */
  public async updatePaymentTerm(
    id: number,
    dto: UpdatePaymentTermRequestDto
  ): Promise<PaymentTermResponseDto> {
    let entity = await this.paymentTermRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = PaymentTermMapper.toUpdateEntity(entity, dto);
      entity = await this.paymentTermRepository.save(entity);
      return PaymentTermMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update payment-term by id
   */
  public async deletePaymentTerm(id: number): Promise<PaymentTermResponseDto> {
    let entity = await this.paymentTermRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.paymentTermRepository.delete({ id: id });
      return PaymentTermMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
