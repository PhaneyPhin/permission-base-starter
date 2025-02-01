import { Module } from "@nestjs/common";
import { BranchModule } from "./branch/branch.module";
import { CompanyModule } from "./company/company.module";
import { MasterDataModule } from "./construction/master-data/master-data.module";
import { DepartmentModule } from "./department/department.module";
import { HumanResourceModule } from "./human-resource/human-resource.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { CategoryModule } from "./procument/master-data/category/category.module";
import { ProcumentModule } from "./procument/procument.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { VendorModule } from "./vendor/vendor.module";
import { WarehouseModule } from "./warehouse/warehouse.module";
import { BankClassificationModule } from './bank-classification/bank-classification.module';

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
    VendorModule,
    BankClassificationModule,
  ],
})
export class AccessModule {}
