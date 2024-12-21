import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { RoleEntity } from '@admin/access/roles/role.entity';
import { PermissionEntity } from '@admin/access/permissions/permission.entity';
import { UserStatus } from '@admin/access/users/user-status.enum';
import { HashHelper } from '@helpers';

// Define seed data
const users = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    password: 'Hello123',
    username: 'Admin',
    isSuperUser: true,
    status: UserStatus.Active,
  },
];

const rolePermissions = {
  Developer: [
    { slug: 'developer.access.users.read', description: 'Read users' },
    { slug: 'developer.access.users.create', description: 'Create users' },
    { slug: 'developer.access.users.update', description: 'Update users' },
    { slug: 'developer.access.roles.read', description: 'Read Roles' },
    { slug: 'developer.access.roles.create', description: 'Create Roles' },
    { slug: 'developer.access.roles.update', description: 'Update Roles' },
    { slug: 'developer.access.permissions.read', description: 'Read permissions' },
    { slug: 'developer.access.permissions.create', description: 'Create permissions' },
    { slug: 'developer.access.permissions.update', description: 'Update permissions' },
  ],
  Admin: [
    { slug: 'admin.access.users.read', description: 'Read users' },
    { slug: 'admin.access.users.create', description: 'Create users' },
    { slug: 'admin.access.users.update', description: 'Update users' },
    { slug: 'admin.access.roles.read', description: 'Read Roles' },
    { slug: 'admin.access.roles.create', description: 'Create Roles' },
    { slug: 'admin.access.roles.update', description: 'Update Roles' },
  ],
};

async function seedDatabase(dataSource: DataSource) {
  const roleNames = Object.keys(rolePermissions);

  // Create permissions
  const permissions = roleNames.flatMap((role) => rolePermissions[role]);
  const permissionEntities = permissions.map((permission) =>
    dataSource.manager.create(PermissionEntity, permission),
  );
  const savedPermissions = await dataSource.manager.save(permissionEntities);

  // Map saved permissions to their slugs
  const permissionMap = Object.fromEntries(
    savedPermissions.map((p) => [p.slug, p]),
  );

  // Create roles
  const roleEntities = roleNames.map((roleName) =>
    dataSource.manager.create(RoleEntity, {
      name: roleName,
      permissions: rolePermissions[roleName].map((p) => permissionMap[p.slug]),
    }),
  );
  const savedRoles = await dataSource.manager.save(roleEntities);

  // Create users
  for (const user of users) {
    const hashedPassword = await HashHelper.encrypt(user.password);
    const userEntity = dataSource.manager.create(UserEntity, {
      ...user,
      password: hashedPassword,
      roles: savedRoles,
    } as any);
    await dataSource.manager.save(userEntity);
  }

  console.log('Database seeded successfully!');
}

// Bootstrap the seeding process
async function bootstrap() {
  // Initialize ConfigModule
  ConfigModule.forRoot({
    envFilePath: '.env',
  });

  const configService = new ConfigService();

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('TYPEORM_HOST', 'localhost'),
    port: configService.get<number>('TYPEORM_PORT', 5432),
    username: configService.get<string>('TYPEORM_USERNAME', 'postgres'),
    password: configService.get<string>('TYPEORM_PASSWORD', 'password'),
    database: configService.get<string>('TYPEORM_DATABASE', 'nestjs_sample'),
    entities: [UserEntity, RoleEntity, PermissionEntity],
    synchronize: false,
    logging: configService.get<boolean>('TYPEORM_LOGGING', false),
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);
  await dataSource.destroy();
}

bootstrap().catch((error) => {
  console.error('Error during database seeding:', error);
  process.exit(1);
});
