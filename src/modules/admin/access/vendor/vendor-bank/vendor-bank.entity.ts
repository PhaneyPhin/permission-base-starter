import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { VendorEntity } from "../vendor/vendor.entity";

@Entity({ schema: "admin", name: "vendor-bank" })
export class VendorBankEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "bank_id",
    type: "varchar",
    nullable: true,
  })
  bankId: string;

  @Column({
    name: "account_number",
    type: "varchar",
    nullable: true,
  })
  accountNumber: string;

  @Column({
    name: "benifitsary_name",
    type: "varchar",
    nullable: true,
  })
  benifitsaryName: string;

  @Column({
    name: "currency",
    type: "varchar",
    nullable: true,
  })
  currency: string;

  @Column({
    name: "active",
    type: "boolean",
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({
    name: "created_by",
    type: "uuid",
    nullable: true,
  })
  createdBy: string;

  @Column({
    name: "country_code",
    type: "varchar",
    nullable: true,
  })
  countryCode: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => VendorEntity, (vendor) => vendor.vendorBanks, {
    nullable: true,
  })
  @JoinColumn({ name: "vendor_id" })
  vendor: VendorEntity;

  constructor(partial?: Partial<VendorBankEntity>) {
    super();
    Object.assign(this, partial);
  }
}
