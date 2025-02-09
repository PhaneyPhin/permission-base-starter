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
import { VendorBankEntity } from "../vendor-bank/vendor-bank.entity";
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from "./dtos";
import { VendorExistsException } from "./vendor-exist.exception"; // e.g., custom exception
import { VendorEntity } from "./vendor.entity";
import { VendorMapper } from "./vendor.mapper";

export const VENDOR_FILTER_FIELDS = [
  "nameEn",
  "nameKh",
  "contactPerson",
  "phoneNumber",
  "email",
  "address",
  "paymentTermId",
  "paymentMethodId",
];
@Injectable()
export class VendorService extends BaseCrudService {
  protected queryName: string = "vendor";
  protected SEARCH_FIELDS = [
    "nameEn",
    "nameKh",
    "contactPerson",
    "phoneNumber",
    "email",
    "address",
    "paymentTermId",
    "paymentMethodId",
  ];
  protected FILTER_FIELDS = VENDOR_FILTER_FIELDS;

  constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(VendorBankEntity)
    private vendorBankRepository: Repository<VendorBankEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return VendorMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<VendorEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("vendor.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.vendorRepository
      .createQueryBuilder("vendor")
      .leftJoinAndSelect("vendor.createdByUser", "cb")
      .leftJoinAndSelect("vendor.updatedByUser", "ub")
      .leftJoinAndSelect("vendor.vendorClass", "vc")
      .leftJoinAndSelect("vendor.vendorType", "vt")
      .leftJoinAndSelect("vendor.paymentMethod", "pm")
      .leftJoinAndSelect("vendor.paymentTerm", "pt");
  }

  getAllVendor() {
    return this.vendorRepository
      .createQueryBuilder("vendor")
      .select(["id", "name"])
      .getRawMany();
  }

  /**
   * Get vendor by id
   */
  public async getVendorById(id: number): Promise<VendorResponseDto> {
    const entity = await this.getListQuery()
      .leftJoinAndSelect("vendor.vendorBanks", "vb")
      .where("vendor.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return VendorMapper.toDto(entity);
  }

  /**
   * Create new vendor
   */
  public async createVendor(
    dto: CreateVendorRequestDto
  ): Promise<VendorResponseDto> {
    try {
      let entity = VendorMapper.toCreateEntity(dto);
      entity = await this.vendorRepository.save(entity);
      return VendorMapper.toDto(entity);
    } catch (error) {
      console.log(error);
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor by id
   */
  public async updateVendor(
    id: number,
    dto: UpdateVendorRequestDto
  ): Promise<VendorResponseDto> {
    let entity = await this.vendorRepository.findOne({
      where: { id },
      relations: ["vendorBanks"],
    });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      const existingBankIds = entity.vendorBanks.map((bank) => bank.id);
      const dtoBankIds = dto.vendorBanks?.map((bank) => bank.id) ?? [];
      const banksToRemove = existingBankIds.filter(
        (bankId) => !dtoBankIds.includes(bankId)
      );

      if (banksToRemove.length > 0) {
        await this.vendorBankRepository.delete(banksToRemove);
      }

      entity = VendorMapper.toUpdateEntity(entity, dto);
      console.log(entity.vendorBanks);
      entity = await this.vendorRepository.save(entity);
      return VendorMapper.toDto(entity);
    } catch (error) {
      console.log(error);
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorExistsException(dto.nameEn);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor by id
   */
  public async deleteVendor(id: number): Promise<VendorResponseDto> {
    let entity = await this.vendorRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.vendorRepository.delete({ id: id });
      return VendorMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
