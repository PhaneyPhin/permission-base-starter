import { InternalServerErrorException, RequestTimeoutException, NotFoundException, Injectable } from '@nestjs/common';
import { CreatePermissionRequestDto, UpdatePermissionRequestDto, PermissionResponseDto } from './dtos';
import { Pagination, PaginationResponseDto, PaginationRequest } from '@libs/pagination';
import { PermissionsRepository } from './permissions.repository';
import { PermissionExistsException } from '@common/http/exceptions';
import { PermissionMapper } from './permission.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { TimeoutError } from 'rxjs';
import { PermissionEntity } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionsRepository: PermissionsRepository,
  ) {}

  /**
   * Get permision list
   * @param pagination {PaginationRequest}
   * @returns permissionEntities[] and totalPermissions
   */
  public async getPermissionsAndCount(
    pagination: PaginationRequest,
  ): Promise<[permissionEntities: PermissionEntity[], totalPermissions: number]> {
    const {
      skip,
      limit: take,
      order,
      params: { search },
    } = pagination;
    const query = this.permissionsRepository.createQueryBuilder().skip(skip).take(take).orderBy(order);

    if (search) {
      query.where('description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return query.getManyAndCount();
  }
  /**
   * Get a paginated permission list
   * @param pagination {PaginationRequest}
   * @returns {Promise<PaginationResponseDto<PermissionResponseDto>>}
   */
  public async getPermissions(pagination: PaginationRequest): Promise<PaginationResponseDto<PermissionResponseDto>> {
    try {
      const [permissionEntities, totalPermissions] = await this.getPermissionsAndCount(
        pagination,
      );
      const permissionDtos = await Promise.all(permissionEntities.map(PermissionMapper.toDto));
      return Pagination.of(pagination, totalPermissions, permissionDtos);
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get permission by id
   * @param id {number}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async getPermissionById(id: number): Promise<PermissionResponseDto> {
    const permissionEntity = await this.permissionsRepository.findOneBy({ id });
    if (!permissionEntity) {
      throw new NotFoundException();
    }

    return PermissionMapper.toDto(permissionEntity);
  }

  /**
   * Create new permission
   * @param permissionDto {CreatePermissionRequestDto}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async createPermission(permissionDto: CreatePermissionRequestDto): Promise<PermissionResponseDto> {
    try {
      let permissionEntity = PermissionMapper.toCreateEntity(permissionDto);
      permissionEntity = await this.permissionsRepository.save(permissionEntity);
      return PermissionMapper.toDto(permissionEntity);
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new PermissionExistsException(permissionDto.slug);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Update permission by id
   * @param id {number}
   * @param permissionDto {UpdatePermissionRequestDto}
   * @returns {Promise<PermissionResponseDto>}
   */
  public async updatePermission(id: number, permissionDto: UpdatePermissionRequestDto): Promise<PermissionResponseDto> {
    let permissionEntity = await this.permissionsRepository.findOneBy({ id });
    if (!permissionEntity) {
      throw new NotFoundException();
    }

    try {
      permissionEntity = PermissionMapper.toUpdateEntity(permissionEntity, permissionDto);
      permissionEntity = await this.permissionsRepository.save(permissionEntity);
      return PermissionMapper.toDto(permissionEntity);
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new PermissionExistsException(permissionDto.slug);
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
