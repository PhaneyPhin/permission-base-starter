import { PermissionMapper } from '../permissions/permission.mapper';
import { RoleEntity } from '../roles/role.entity';
import { RoleMapper } from '../roles/role.mapper';
import { CreateUserRequestDto, UserResponseDto, UpdateUserRequestDto } from './dtos';
import { UserEntity } from './user.entity';

export class UserMapper {
  public static async toDto(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.name = entity.name;
    dto.status = entity.status;
    dto.isSuperUser = entity.isSuperUser;
    dto.expiredAt = entity.expiredAt
    dto.createdBy = entity.createdBy?.name;

    if (entity.createdBy) {
    }
    dto.roles = await Promise.all((await entity.roles).map(RoleMapper.toDto));

    return dto;
  }

  public static async toDtoWithRelations(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto();

    dto.id = entity.id;
    dto.username = entity.username;
    dto.name = entity.name;
    dto.email = entity.email
    dto.expiredAt = entity.expiredAt
    dto.createdBy = entity.createdBy?.name;
    dto.permissions = await Promise.all((await entity.permissions).map(PermissionMapper.toDto));
    dto.roles = await Promise.all((await entity.roles).map(RoleMapper.toDtoWithRelations));
    dto.isSuperUser = entity.isSuperUser;
    dto.status = entity.status;
    return dto;
  }

  public static toCreateEntity(dto: CreateUserRequestDto): UserEntity {
    const entity = new UserEntity();
    entity.username = dto.username;
    entity.name = dto.name;
    entity.userApproval = dto.userApproval
    entity.status = dto.status
    entity.password = dto.password;
    entity.email = dto.email;
    entity.createdBy = dto.createdBy;
    
    entity.roles = Promise.resolve(dto.roles.map((id) => new RoleEntity({ id })));
    entity.isSuperUser = false;
    return entity;
  }

  public static toUpdateEntity(entity: UserEntity, dto: UpdateUserRequestDto): UserEntity {
    entity.username = dto.username;
    entity.name = dto.name;
    entity.userApproval = dto.userApproval
    entity.status = dto.status
    entity.email = dto.email;
    entity.createdBy = dto.createdBy;
    entity.roles = Promise.resolve(dto.roles.map((id) => new RoleEntity({ id })));
    return entity;
  }
}
