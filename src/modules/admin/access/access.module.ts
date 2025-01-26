import { Module } from '@nestjs/common';
import { BranchModule } from './branch/branch.module';
import { CompanyModule } from './company/company.module';
import { MasterDataModule } from './construction/master-data/master-data.module';
import { DepartmentModule } from './department/department.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { HumanResourceModule } from './human-resource/human-resource.module';
import { ProcumentModule } from './procument/procument.module';
import { CategoryModule } from './procument/master-data/category/category.module';

@Module({
  imports: [
    RolesModule,
    PermissionsModule,
    UsersModule,
    WarehouseModule,
    CompanyModule,
    BranchModule,
    DepartmentModule,
    MasterDataModule,
    HumanResourceModule,
    CategoryModule,
    ProcumentModule,
  ],
})
export class AccessModule {}
