import { PermissionEntity } from "@admin/access/permissions/permission.entity";
import { RoleEntity } from "@admin/access/roles/role.entity";
import { UserStatus } from "@admin/access/users/user-status.enum";
import { UserEntity } from "@admin/access/users/user.entity";
import { faker } from "@faker-js/faker";
import { HashHelper } from "@helpers";
import minioClient from "@libs/pagination/minio";
import { BankEntity } from "@modules/admin/access/bank-classification/bank/bank.entity";
import { PaymentMethodEntity } from "@modules/admin/access/bank-classification/payment-method/payment-method.entity";
import { PaymentTermEntity } from "@modules/admin/access/bank-classification/payment-term/payment-term.entity";
import { BranchEntity } from "@modules/admin/access/branch/branch.entity";
import { CompanyEntity } from "@modules/admin/access/company/company.entity";
import { AnalysisCodeEntity } from "@modules/admin/access/construction/master-data/analysis-code/analysis-code.entity";
import { DimensionEntity } from "@modules/admin/access/construction/master-data/dimension/dimension.entity";
import { DepartmentEntity } from "@modules/admin/access/department/department.entity";
import { ValuationMethodEntity } from "@modules/admin/access/procurement/master-data/valuation-method/valuation-method.entity";
import { UserApproval } from "@modules/admin/access/users/user-approval";
import { VendorClassEntity } from "@modules/admin/access/vendor/vendor-class/vendor-class.entity";
import { VendorTypeEntity } from "@modules/admin/access/vendor/vendor-type/vendor-type.entity";
import { WarehouseEntity } from "@modules/admin/access/warehouse/warehouse.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { banks } from "./bank.seed";
import { companies } from "./company.seed";
import { branches } from "./create-branch.seed";
import { departments } from "./create-department.seed";
import { paymentMethods } from "./payment-method.seed";
import { paymentTerms } from "./payment-term.seed";
import { valuationMethods } from "./valuation-method.seed";
import { vendorClasses } from "./vendor-class.seed";
import { vendorTypes } from "./vendor-type.seed";

// Define seed data
const baseUsers: any[] = [
  {
    name: "Admin",
    password: "Hello123",
    username: "Admin",
    isSuperUser: true,
    userApproval: UserApproval.Approved,
    status: UserStatus.Active, // Default status which will be overridden by Faker and random assignment.
  },
];

const permissions = [
  { slug: "admin.access.users.read", description: "Read users" },
  { slug: "admin.access.users.create", description: "Create users" },
  { slug: "admin.access.users.update", description: "Update users" },
  { slug: "admin.access.users.import", description: "Import users" },
  { slug: "admin.access.users.export", description: "Export users" },
  { slug: "admin.access.users.delete", description: "Delete users" },

  { slug: "admin.access.roles.read", description: "Read Roles" },
  { slug: "admin.access.roles.create", description: "Create Roles" },
  { slug: "admin.access.roles.update", description: "Update Roles" },
  { slug: "admin.access.warehouse.read", description: "Read warehouse" },
  { slug: "admin.access.warehouse.create", description: "Create warehouse" },
  { slug: "admin.access.warehouse.update", description: "Update warehouse" },
  { slug: "admin.access.warehouse.delete", description: "Delete warehouse" },

  { slug: "admin.access.company.read", description: "Read company" },
  { slug: "admin.access.company.create", description: "Create company" },
  { slug: "admin.access.company.update", description: "Update company" },
  { slug: "admin.access.company.delete", description: "Delete company" },

  { slug: "admin.access.branch.read", description: "Read branch" },
  { slug: "admin.access.branch.create", description: "Create branch" },
  { slug: "admin.access.branch.update", description: "Update branch" },
  { slug: "admin.access.branch.delete", description: "Delete branch" },

  { slug: "admin.access.department.create", description: "Create department" },
  { slug: "admin.access.department.update", description: "Update department" },
  { slug: "admin.access.department.delete", description: "Delete department" },

  { slug: "admin.access.dimension.read", description: "Read branch" },
  { slug: "admin.access.dimension.create", description: "Create branch" },
  { slug: "admin.access.dimension.update", description: "Update branch" },
  { slug: "admin.access.dimension.delete", description: "Delete branch" },

  {
    slug: "admin.access.analysis-code.read",
    description: "Read analysis code",
  },
  {
    slug: "admin.access.analysis-code.create",
    description: "Create analysis code",
  },
  {
    slug: "admin.access.analysis-code.update",
    description: "Update analysis code",
  },
  {
    slug: "admin.access.analysis-code.delete",
    description: "Delete analysis code",
  },

  { slug: "admin.access.master-plan.read", description: "Read master plan" },
  {
    slug: "admin.access.master-plan.create",
    description: "Create master plan",
  },
  {
    slug: "admin.access.master-plan.update",
    description: "Update master plan",
  },
  {
    slug: "admin.access.master-plan.delete",
    description: "Delete master plan",
  },

  {
    slug: "admin.access.employee-position.read",
    description: "Read master plan",
  },
  {
    slug: "admin.access.employee-position.create",
    description: "Create master plan",
  },
  {
    slug: "admin.access.employee-position.update",
    description: "Update master plan",
  },
  {
    slug: "admin.access.employee-position.delete",
    description: "Delete master plan",
  },

  { slug: "admin.access.category.read", description: "Read Category" },
  { slug: "admin.access.category.create", description: "Create Category" },
  { slug: "admin.access.category.update", description: "Update Category" },
  { slug: "admin.access.category.delete", description: "Delete Category" },

  { slug: "admin.access.position.read", description: "Read Position" },
  { slug: "admin.access.position.create", description: "Create Position" },
  { slug: "admin.access.position.update", description: "Update Position" },
  { slug: "admin.access.position.delete", description: "Delete Position" },

  { slug: "admin.access.nationality.read", description: "Read Nationality" },
  {
    slug: "admin.access.nationality.create",
    description: "Create Nationality",
  },
  {
    slug: "admin.access.nationality.update",
    description: "Update Nationality",
  },
  {
    slug: "admin.access.nationality.delete",
    description: "Delete Nationality",
  },

  {
    slug: "admin.access.staff-profile.read",
    description: "Read Staff Profile",
  },
  {
    slug: "admin.access.staff-profile.create",
    description: "Create Staff Profile",
  },
  {
    slug: "admin.access.staff-profile.update",
    description: "Update Staff Profile",
  },
  {
    slug: "admin.access.staff-profile.delete",
    description: "Delete Staff Profile",
  },
  {
    slug: "admin.access.staff-profile.update-status",
    description: "Update status of Staff Profile",
  },

  { slug: "admin.access.item-group.read", description: "Read Item Group" },
  { slug: "admin.access.item-group.create", description: "Create Item Group" },
  { slug: "admin.access.item-group.update", description: "Update Item Group" },
  { slug: "admin.access.item-group.delete", description: "Delete Item Group" },

  { slug: "admin.access.uom.read", description: "Read Unit of Measure" },
  { slug: "admin.access.uom.create", description: "Create Unit of Measure" },
  { slug: "admin.access.uom.update", description: "Update Unit of Measure" },
  { slug: "admin.access.uom.delete", description: "Delete Unit of Measure" },

  { slug: "admin.access.item.read", description: "Read Item" },
  { slug: "admin.access.item.create", description: "Create Item" },
  { slug: "admin.access.item.update", description: "Update Item" },
  { slug: "admin.access.item.delete", description: "Delete Item" },

  { slug: "admin.access.vendor-type.read", description: "Read vendor-type" },
  {
    slug: "admin.access.vendor-type.create",
    description: "Create vendor-type",
  },
  {
    slug: "admin.access.vendor-type.update",
    description: "Update vendor-type",
  },
  {
    slug: "admin.access.vendor-type.delete",
    description: "Delete vendor-type",
  },

  { slug: "admin.access.vendor-class.read", description: "Read vendor-class" },
  {
    slug: "admin.access.vendor-class.create",
    description: "Create vendor-class",
  },
  {
    slug: "admin.access.vendor-class.update",
    description: "Update vendor-class",
  },
  {
    slug: "admin.access.vendor-class.delete",
    description: "Delete vendor-class",
  },

  { slug: "admin.access.bank.read", description: "Read bank" },
  {
    slug: "admin.access.bank.create",
    description: "Create bank",
  },
  {
    slug: "admin.access.bank.update",
    description: "Update bank",
  },
  {
    slug: "admin.access.bank.delete",
    description: "Delete bank",
  },

  {
    slug: "admin.access.payment-method.read",
    description: "Read payment-method",
  },
  {
    slug: "admin.access.payment-method.create",
    description: "Create payment-method",
  },
  {
    slug: "admin.access.payment-method.update",
    description: "Update payment-method",
  },
  {
    slug: "admin.access.payment-method.delete",
    description: "Delete payment-method",
  },

  { slug: "admin.access.payment-term.read", description: "Read payment-term" },
  {
    slug: "admin.access.payment-term.create",
    description: "Create payment-term",
  },
  {
    slug: "admin.access.payment-term.update",
    description: "Update payment-term",
  },
  {
    slug: "admin.access.payment-term.delete",
    description: "Delete payment-term",
  },

  { slug: "admin.access.vendor.read", description: "Read vendor" },
  {
    slug: "admin.access.vendor.create",
    description: "Create vendor",
  },
  {
    slug: "admin.access.vendor.update",
    description: "Update vendor",
  },
  {
    slug: "admin.access.vendor.delete",
    description: "Delete vendor",
  },

  { slug: "admin.access.vendor-bank.read", description: "Read vendor-bank" },
  {
    slug: "admin.access.vendor-bank.create",
    description: "Create vendor-bank",
  },
  {
    slug: "admin.access.vendor-bank.update",
    description: "Update vendor-bank",
  },
  {
    slug: "admin.access.vendor-bank.delete",
    description: "Delete vendor-bank",
  },

  { slug: "admin.access.request-type.read", description: "Read request-type" },
  {
    slug: "admin.access.request-type.create",
    description: "Create request-type",
  },
  {
    slug: "admin.access.request-type.update",
    description: "Update request-type",
  },
  {
    slug: "admin.access.request-type.delete",
    description: "Delete request-type",
  },

  {
    slug: "admin.access.purchase-order-type.read",
    description: "Read purchase-order-type",
  },
  {
    slug: "admin.access.purchase-order-type.create",
    description: "Create purchase-order-type",
  },
  {
    slug: "admin.access.purchase-order-type.update",
    description: "Update purchase-order-type",
  },
  {
    slug: "admin.access.purchase-order-type.delete",
    description: "Delete purchase-order-type",
  },

  {
    slug: "admin.access.purchase-receipt-type.read",
    description: "Read purchase-receipt-type",
  },
  {
    slug: "admin.access.purchase-receipt-type.create",
    description: "Create purchase-receipt-type",
  },
  {
    slug: "admin.access.purchase-receipt-type.update",
    description: "Update purchase-receipt-type",
  },
  {
    slug: "admin.access.purchase-receipt-type.delete",
    description: "Delete purchase-receipt-type",
  },

  {
    slug: "admin.access.quotation-type.read",
    description: "Read quotation-type",
  },
  {
    slug: "admin.access.quotation-type.create",
    description: "Create quotation-type",
  },
  {
    slug: "admin.access.quotation-type.update",
    description: "Update quotation-type",
  },
  {
    slug: "admin.access.quotation-type.delete",
    description: "Delete quotation-type",
  },

  {
    slug: "admin.access.valuation-method.read",
    description: "Read Valuation Method",
  },
  {
    slug: "admin.access.valuation-method.create",
    description: "Create Valuation Method",
  },
  {
    slug: "admin.access.valuation-method.update",
    description: "Update vValuation Method",
  },
  {
    slug: "admin.access.valuation-method.delete",
    description: "Delete Valuation Method",
  },
];

const rolePermissions = {
  Management: [...permissions].splice(8, permissions.length),
  Accounting: [...permissions].splice(8, permissions.length),
  Admin: permissions,
};

const seedBuckets = ["images", "files"];

// // Utility function for random status selection
// function getRandomStatus(): UserStatus {
//   return Math.random() < 0.5 ? UserStatus.Active : UserStatus.Inactive;
// }

async function createBucket(bucketName: string) {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
  }
}

async function seedDatabase(dataSource: DataSource) {
  const roleNames = Object.keys(rolePermissions);

  // Create permissions
  const allPermissions = permissions;
  const permissionEntities = allPermissions.map((permission) =>
    dataSource.manager.create(PermissionEntity, permission)
  );
  const savedPermissions = await dataSource.manager.save(permissionEntities);

  // Map saved permissions to their slugs
  const permissionMap = Object.fromEntries(
    savedPermissions.map((p) => [p.slug, p])
  );

  // Create roles
  const roleEntities = roleNames.map((roleName) =>
    dataSource.manager.create(RoleEntity, {
      name: roleName,
      permissions: rolePermissions[roleName].map((p) => permissionMap[p.slug]),
    })
  );
  const savedRoles = await dataSource.manager.save(roleEntities);

  const baseUser = baseUsers[0];

  // Create initial user with fake data and random status
  const firstUserData = {
    ...baseUser,
    name: faker.person.fullName(),
    username: "admin",
    email: faker.internet.email(),
    status: UserStatus.Active,
  };
  const firstHashedPassword = await HashHelper.encrypt(firstUserData.password);
  const firstUserEntity = dataSource.manager.create(UserEntity, {
    ...firstUserData,
    password: firstHashedPassword,
    roles: savedRoles,
  } as any);
  console.log("firstEntity", firstUserEntity);
  await dataSource.manager.save(firstUserEntity);

  // Create 200 additional users with Faker data
  for (let i = 0; i < 2; i++) {
    const fakeName = faker.person.fullName();
    const fakeUsername = "admin" + i;
    const fakeEmail = faker.internet.email();

    const userData = {
      ...baseUser,
      name: fakeName,
      username: fakeUsername,
      email: fakeEmail,
      status: UserStatus.Active,
    };

    const hashedPassword = await HashHelper.encrypt(userData.password);
    const userEntity = dataSource.manager.create(UserEntity, {
      ...userData,
      password: hashedPassword,
      roles: savedRoles,
    } as any);
    console.log(userEntity);
    await dataSource.manager.save(userEntity);
  }

  const user = await dataSource.manager.findOneByOrFail(UserEntity, {
    username: "admin1",
  });
  await dataSource.manager.save(BranchEntity, branches);

  for (var index = 0; index < 5; index++) {
    const warehouseEntity = dataSource.manager.create(WarehouseEntity, {
      active: true,
      code: "00000" + (index + 1),
      branch_id: branches[0].id,
      createdBy: user.id,
      description: faker.person.jobDescriptor(),
      nameEn: faker.person.fullName(),
      nameKh: faker.person.fullName(),
    });

    await dataSource.manager.save(warehouseEntity);
  }

  await dataSource.manager.save(DepartmentEntity, departments);
  await dataSource.manager.save(BranchEntity, branches);
  await dataSource.manager.save(CompanyEntity, companies);
  await dataSource.manager.save(ValuationMethodEntity, valuationMethods);
  await dataSource.manager.save(BankEntity, banks);
  await dataSource.manager.save(PaymentMethodEntity, paymentMethods);
  await dataSource.manager.save(PaymentTermEntity, paymentTerms);
  await dataSource.manager.save(VendorClassEntity, vendorClasses);
  await dataSource.manager.save(VendorTypeEntity, vendorTypes);

  const defaultDimension = {
    createdBy: user.id,
    updatedBy: user.id,
  };
  const dimensions = dataSource.manager.create(DimensionEntity, [
    {
      ...defaultDimension,
      code: "01",
      nameEn: "Project",
      nameKh: "គម្រោង",
    },
    {
      ...defaultDimension,
      code: "02",
      nameEn: "Block",
      nameKh: "ប្លុក",
    },
    {
      ...defaultDimension,
      code: "03",
      nameEn: "Building",
      nameKh: "អាគារ",
    },
    {
      ...defaultDimension,
      code: "04",
      nameEn: "Street",
      nameKh: "ផ្លូវ",
    },
    {
      ...defaultDimension,
      code: "05",
      nameEn: "Division",
      nameKh: "ផ្នែក",
    },
    {
      ...defaultDimension,
      code: "06",
      nameEn: "Unit Type",
      nameKh: "ប្រភេទផ្ទះ",
    },
  ]);

  const dimensionEntities = await dataSource.manager.save(dimensions);

  const analysisCodes = dimensionEntities.map((dimension) => {
    return dataSource.manager.create(AnalysisCodeEntity, {
      dimensionId: dimension.id,
      nameEn: faker.person.firstName(),
      nameKh: faker.person.firstName(),
      code: dimension.code,
    });
  });

  await dataSource.manager.save(analysisCodes);
  console.log("Database seeded successfully!");
}

// Bootstrap the seeding process
async function bootstrap() {
  // Initialize ConfigModule
  ConfigModule.forRoot({
    envFilePath: ".env",
  });

  const configService = new ConfigService();

  const dataSource = new DataSource({
    type: "postgres",
    host: configService.get<string>("TYPEORM_HOST", "localhost"),
    port: configService.get<number>("TYPEORM_PORT", 5432),
    username: configService.get<string>("TYPEORM_USERNAME", "postgres"),
    password: configService.get<string>("TYPEORM_PASSWORD", "password"),
    database: configService.get<string>("TYPEORM_DATABASE", "nestjs_sample"),
    entities: [
      require("path").join(__dirname, "../../modules/**/*.entity.{ts,js}"),
    ],
    synchronize: false,
    logging: configService.get<boolean>("TYPEORM_LOGGING", false),
  });

  await Promise.all(seedBuckets.map(createBucket));
  await dataSource.initialize();
  await seedDatabase(dataSource);
  await dataSource.destroy();
}

bootstrap().catch((error) => {
  console.error("Error during database seeding:", error);
  process.exit(1);
});
