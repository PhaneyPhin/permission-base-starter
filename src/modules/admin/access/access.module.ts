import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    RolesModule,
    PermissionsModule,
    UsersModule,
    WarehouseModule,
    CompanyModule,
    BranchModule
  ],
})
export class AccessModule {}
