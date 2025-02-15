import { BaseCrudService } from "@common/services/base-crud.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDeleteError, handleError } from "@utils/handle-error";
import { Filter, Repository } from "typeorm";
import {
  CreateVendorClassRequestDto,
  UpdateVendorClassRequestDto,
  VendorClassResponseDto,
} from "./dtos";
import { VendorClassEntity } from "./vendor-class.entity";
import { VendorClassMapper } from "./vendor-class.mapper";

export const VENDOR_CLASS_FILTER_FIELDS = [
  "code",
  "nameEn",
  "nameKh",
  "description",
];
@Injectable()
export class VendorClassService extends BaseCrudService {
  protected queryName: string = "vendorClass";
  protected SEARCH_FIELDS = ["code", "nameEn", "nameKh", "description"];
  protected FILTER_FIELDS = VENDOR_CLASS_FILTER_FIELDS;

  constructor(
    @InjectRepository(VendorClassEntity)
    private vendorClassRepository: Repository<VendorClassEntity>
  ) {
    super();
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields() {
    return VendorClassMapper.toDto;
  }

  /**
   * Customize filter by each field query logic on listing API
   */
  protected getFilters() {
    const filters: { [key: string]: Filter<VendorClassEntity> } = {
      createdAt: (query, value) => {
        const [start, end] = value.split(",");
        return query.andWhere(
          "vendorClass.created_at BETWEEN :start AND :end",
          { start, end }
        );
      },
    };

    return filters;
  }

  /** Require for base query list of feature */
  protected getListQuery() {
    return this.vendorClassRepository
      .createQueryBuilder("vendorClass")
      .leftJoinAndSelect("vendorClass.createdByUser", "uc");
  }

  getAllVendorClass() {
    console.log("qqq");
    return this.vendorClassRepository.find({
      select: {
        id: true,
        nameEn: true,
        nameKh: true,
      },
    });
  }

  /**
   * Get vendor-class by id
   */
  public async getVendorClassById(id: number): Promise<VendorClassResponseDto> {
    const entity = await this.getListQuery()
      .where("vendorClass.id = :id", { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }
    return VendorClassMapper.toDto(entity);
  }

  /**
   * Create new vendor-class
   */
  public async createVendorClass(
    dto: CreateVendorClassRequestDto
  ): Promise<VendorClassResponseDto> {
    try {
      let entity = VendorClassMapper.toCreateEntity(dto);
      entity = await this.vendorClassRepository.save(entity);
      return VendorClassMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update vendor-class by id
   */
  public async updateVendorClass(
    id: number,
    dto: UpdateVendorClassRequestDto
  ): Promise<VendorClassResponseDto> {
    let entity = await this.vendorClassRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      entity = VendorClassMapper.toUpdateEntity(entity, dto);
      entity = await this.vendorClassRepository.save(entity);
      return VendorClassMapper.toDto(entity);
    } catch (error) {
      handleError(error, dto);
    }
  }

  /**
   * Update vendor-class by id
   */
  public async deleteVendorClass(id: number): Promise<VendorClassResponseDto> {
    let entity = await this.vendorClassRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    try {
      await this.vendorClassRepository.delete({ id: id });
      return VendorClassMapper.toDto(entity);
    } catch (error) {
      handleDeleteError(id, error);
    }
  }
}
