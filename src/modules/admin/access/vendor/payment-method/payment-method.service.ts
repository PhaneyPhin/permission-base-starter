import { DBErrorCode } from "@common/enums";
import { BaseCrudService } from "@common/services/base-crud.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimeoutError } from "rxjs";
import { Filter, Repository } from "typeorm";
import {
  CreatePaymentMethodRequestDto,
  PaymentMethodResponseDto,
  UpdatePaymentMethodRequestDto,
} from "./dtos";
import { PaymentMethodExistsException } from "./payment-method-exist.exception"; // e.g., custom exception
import { PaymentMethodEntity } from "./payment-method.entity";
import { PaymentMethodMapper } from "./payment-method.mapper";

export const PAYMENT_METHOD_FILTER_FIELDS = ["name", "description"];
@Injectable()
export class PaymentMethodService extends BaseCrudService {
  protected queryName: string = "paymentMethod";
  protected SEARCH_FIELDS = ["name", "description"];
  protected FILTER_FIELDS = PAYMENT_METHOD_FILTER_FIELDS;

  constructor(
    @InjectRepository(PaymentMethodEntity)
    private paymentMethodRepository: Repository<PaymentMethodEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return PaymentMethodMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<PaymentMethodEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "paymentMethod.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.paymentMethodRepository
      .createQueryBuilder("paymentMethod")
      .leftJoinAndSelect("paymentMethod.createdByUser", "uc");
  }

  getAllPaymentMethod() {
    return this.paymentMethodRepository
      .createQueryBuilder("paymentMethod")
      .select(["id", "name"])
      .getRawMany();
  }

  /**
   * Get payment-method by id
   */
  public async getPaymentMethodById(
    id: number
  ): Promise<PaymentMethodResponseDto> {
    const entity = await this.getListQuery()
      .where("warehouse.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return PaymentMethodMapper.toDto(entity);
  }

  /**
   * Create new payment-method
   */
  public async createPaymentMethod(
    dto: CreatePaymentMethodRequestDto
  ): Promise<PaymentMethodResponseDto> {
    try {
      let entity = PaymentMethodMapper.toCreateEntity(dto);
      entity = await this.paymentMethodRepository.save(entity);
      return PaymentMethodMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new PaymentMethodExistsException(dto.name);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update payment-method by id
   */
  public async updatePaymentMethod(
    id: number,
    dto: UpdatePaymentMethodRequestDto
  ): Promise<PaymentMethodResponseDto> {
    let entity = await this.paymentMethodRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = PaymentMethodMapper.toUpdateEntity(entity, dto);
      entity = await this.paymentMethodRepository.save(entity);
      return PaymentMethodMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new PaymentMethodExistsException(dto.name);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update payment-method by id
   */
  public async deletePaymentMethod(
    id: number
  ): Promise<PaymentMethodResponseDto> {
    let entity = await this.paymentMethodRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.paymentMethodRepository.delete({ id: id });
      return PaymentMethodMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
