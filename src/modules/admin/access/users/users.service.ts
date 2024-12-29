import { InternalServerErrorException, RequestTimeoutException, NotFoundException, Injectable } from '@nestjs/common';
import { ChangePasswordRequestDto, CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto } from './dtos';
import {
  InvalidCurrentPasswordException,
  ForeignKeyConflictException,
  UserExistsException,
} from '@common/http/exceptions';
import { Pagination, PaginationRequest, PaginationResponseDto } from '@libs/pagination';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DBErrorCode } from '@common/enums';
import { UserMapper } from './users.mapper';
import { HashHelper } from '@helpers';
import { TimeoutError } from 'rxjs';
import { UserEntity } from './user.entity';
import { Filter } from 'typeorm';
import { BaseCrudService } from '@common/services/base-crud.service';
import { query } from 'express';
export const USER_FILTER_FIELD =  ['username', 'name', 'email']
@Injectable()
export class UsersService extends BaseCrudService {
  protected queryName: string = 'u';
  protected FILTER_FIELDS = USER_FILTER_FIELD;
  protected SEARCH_FIELDS = ['username', 'name', 'email'];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: UsersRepository,
  ) {
    super()
  }

  /**
   * Convert a UserEntity to a UserResponseDto with relations.
   */
  protected getMapperResponseEntityFields(){
     return UserMapper.toDto;
  }

  protected getFilters() {
    const filters: { [key: string]: Filter<UserEntity> } = {
      expiredDate: (query, value) => {
        const [start, end] = value.split(',');
        return query.andWhere('u.created_at BETWEEN :start AND :end', { start, end });
      },
      createdBy: (query, value) => {
        return query.where('u.created_by = :createdBy', { createdBy: value })
      }
    };

    return filters
  }

  protected getListQuery() {
    return this.usersRepository.createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .leftJoinAndSelect('u.permissions', 'p')
      .leftJoinAndSelect('u.createdBy', 'uc')
  }

  getAllUser() {
    return this.usersRepository.createQueryBuilder('u').select(['id', 'name']).getRawMany()
  }
  /**
   * Find user by username
   * @param username {string}
   * @returns Promise<UserEntity | null>
   */
  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'r', 'r.active = true')
      .leftJoinAndSelect('r.permissions', 'rp', 'rp.active = true')
      .leftJoinAndSelect('u.permissions', 'p', 'p.active = true')
      .leftJoinAndSelect('u.createdBy', 'uc')
      .where('u.username = :username', { username })
      .getOne();
  }

  /**
   * Get user by id
   * @param id {string}
   * @returns {Promise<UserResponseDto>}
   */
  public async getUserById(id: string): Promise<UserResponseDto> {
    const userEntity = await this.usersRepository.findOne({
      where: { id },
      relations: ['permissions', 'roles'],
    });
    if (!userEntity) {
      throw new NotFoundException();
    }

    return UserMapper.toDtoWithRelations(userEntity);
  }

  /**
   * Create new user
   * @param userDto {CreateUserRequestDto}
   * @returns {Promise<UserResponseDto>}
   */
  public async createUser(userDto: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      let userEntity = UserMapper.toCreateEntity(userDto);
      userEntity.createdBy = { id: userDto.createdBy.id } as any
      userEntity.password = await HashHelper.encrypt(userEntity.password);
      console.log(userEntity)

      userEntity = await this.usersRepository.save(userEntity);
      return UserMapper.toDto({ ...userEntity, createdBy: userDto.createdBy });
    } catch (error) {
      console.log(error)
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new UserExistsException(userDto.username);
      }
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new ForeignKeyConflictException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Update User by id
   * @param id {string}
   * @param userDto {UpdateUserRequestDto}
   * @returns {Promise<UserResponseDto>}
   */
  public async updateUser(id: string, userDto: UpdateUserRequestDto): Promise<UserResponseDto> {
    let userEntity = await this.usersRepository.findOneBy({ id });
    if (!userEntity) {
      throw new NotFoundException();
    }

    try {
      userEntity = UserMapper.toUpdateEntity(userEntity, userDto);
      userEntity = await this.usersRepository.save(userEntity);
      return UserMapper.toDto(userEntity);
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new UserExistsException(userDto.username);
      }
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new ForeignKeyConflictException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Change user password
   * @param changePassword {ChangePasswordRequestDto}
   * @param user {string}
   * @returns {Promise<UserResponseDto>}
   */
  public async changePassword(changePassword: ChangePasswordRequestDto, userId: string): Promise<UserResponseDto> {
    const { currentPassword, newPassword } = changePassword;

    const userEntity = await this.usersRepository.findOneBy({ id: userId });

    if (!userEntity) {
      throw new NotFoundException();
    }

    const passwordMatch = await HashHelper.compare(currentPassword, userEntity.password);

    if (!passwordMatch) {
      throw new InvalidCurrentPasswordException();
    }

    try {
      userEntity.password = await HashHelper.encrypt(newPassword);
      await this.usersRepository.save(userEntity);
      return UserMapper.toDto(userEntity);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
