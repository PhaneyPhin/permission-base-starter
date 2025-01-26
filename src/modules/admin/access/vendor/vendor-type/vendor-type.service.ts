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
  CreateVendorTypeRequestDto,
  UpdateVendorTypeRequestDto,
  VendorTypeResponseDto,
} from "./dtos";
import { VendorTypeExistsException } from "./vendor-type-exist.exception"; // e.g., custom exception
import { VendorTypeEntity } from "./vendor-type.entity";
import { VendorTypeMapper } from "./vendor-type.mapper";

export const VENDOR_TYPE_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "description",
];
@Injectable()
export class VendorTypeService extends BaseCrudService {
  protected queryName: string = "vendorType";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh", "description"];
  protected FILTER_FIELDS = VENDOR_TYPE_FILTER_FIELDS;

  constructor(
    @InjectRepository(VendorTypeEntity)
    private vendorTypeRepository: Repository<VendorTypeEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return VendorTypeMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<VendorTypeEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere("vendorType.created_at BETWEEN :start AND :end", {
          start,
          end,
        });
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.vendorTypeRepository
      .createQueryBuilder("vendorType")
      .leftJoinAndSelect("vendorType.createdByUser", "uc");
  }

  getAllVendorType() {
    return this.vendorTypeRepository
      .createQueryBuilder("vendorType")
      .select(["id", "name"])
      .getRawMany();
  }

  /**
   * Get vendor-type by id
   */
  public async getVendorTypeById(id: number): Promise<VendorTypeResponseDto> {
    const entity = await this.getListQuery()
      .where("vendorType.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return VendorTypeMapper.toDto(entity);
  }

  /**
   * Create new vendor-type
   */
  public async createVendorType(
    dto: CreateVendorTypeRequestDto
  ): Promise<VendorTypeResponseDto> {
    try {
      let entity = VendorTypeMapper.toCreateEntity(dto);
      entity = await this.vendorTypeRepository.save(entity);
      return VendorTypeMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorTypeExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor-type by id
   */
  public async updateVendorType(
    id: number,
    dto: UpdateVendorTypeRequestDto
  ): Promise<VendorTypeResponseDto> {
    let entity = await this.vendorTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = VendorTypeMapper.toUpdateEntity(entity, dto);
      entity = await this.vendorTypeRepository.save(entity);
      return VendorTypeMapper.toDto(entity);
    } catch (error) {
      if (error.code === DBErrorCode.PgUniqueConstraintViolation) {
        throw new VendorTypeExistsException(dto.code);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update vendor-type by id
   */
  public async deleteVendorType(id: number): Promise<VendorTypeResponseDto> {
    let entity = await this.vendorTypeRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.vendorTypeRepository.delete({ id: id });
      return VendorTypeMapper.toDto(entity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      }
      throw new InternalServerErrorException();
    }
  }
}
