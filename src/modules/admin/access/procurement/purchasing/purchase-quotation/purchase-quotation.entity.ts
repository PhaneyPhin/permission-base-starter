import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import { BranchEntity } from "@modules/admin/access/branch/branch.entity";
import { AnalysisCodeEntity } from "@modules/admin/access/construction/master-data/analysis-code/analysis-code.entity";
import { StaffProfileEntity } from "@modules/admin/access/human-resource/staff-profile/staff-profile.entity";
import { VendorEntity } from "@modules/admin/access/vendor/vendor/vendor.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PurchaseQuotationItemEntity } from "./purchase-quotation-item.entity";

@Entity({ schema: "admin", name: "purchase-quotation" })
export class PurchaseQuotationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "quotation_number",
    type: "varchar",
    length: "160",
    nullable: false,
  })
  quotationNumber: string;

  @Column({
    name: "quotation_type",
    type: "varchar",
    length: "160",
    nullable: false,
  })
  quotationType: string;

  @ManyToOne(() => BranchEntity, { nullable: false })
  @JoinColumn({ name: "branch_id" })
  branch: BranchEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project: AnalysisCodeEntity;

  @Column({
    name: "request_date",
    type: "timestamp with time zone",
    nullable: false,
  })
  requestDate: Date;

  @Column({ name: "requested_by_id" })
  requestedById: string;

  @ManyToOne(() => StaffProfileEntity, { nullable: false })
  @JoinColumn({ name: "requested_by_id" })
  requestedBy: StaffProfileEntity;

  @Column({
    name: "total_qty",
    type: "double precision",
    nullable: false,
    default: 0,
  })
  totalQty: number;

  @Column({
    name: "open_qty",
    type: "double precision",
    nullable: false,
    default: 0,
  })
  openQty: number;

  @Column({
    name: "receipt_qty",
    type: "double precision",
    nullable: false,
    default: 0,
  })
  receiptQty: number;

  @Column({
    name: "total_cost",
    type: "double precision",
    nullable: false,
    default: 0,
  })
  totalCost: number;

  @Column({
    name: "is_approved",
    type: "boolean",
    nullable: true,
  })
  isApproved: boolean;

  @Column({
    name: "is_require_bidding",
    type: "boolean",
    nullable: true,
  })
  isRequireBidding: boolean;

  @Column({
    name: "description",
    type: "varchar",
    length: "160",
    nullable: true,
  })
  description: string;

  @ManyToOne(() => VendorEntity, { nullable: false })
  @JoinColumn({ name: "vendor_id" })
  vendor: VendorEntity;

  @Column({
    name: "currency_code",
    type: "varchar",
    length: "160",
    nullable: false,
  })
  currencyCode: string;

  @Column({
    name: "document_reference",
    type: "varchar",
    length: "160",
    nullable: true,
  })
  documentReference: string;

  @Column({
    name: "status",
    type: "varchar",
    length: "160",
    nullable: false,
    default: "open",
  })
  status: string;

  @Column({
    name: "created_by",
    type: "uuid",
    nullable: true,
  })
  createdBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @Column({
    name: "updated_by",
    type: "uuid",
    nullable: true,
  })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @OneToMany(() => PurchaseQuotationItemEntity, (item) => item.quotation, {
    cascade: true,
  })
  items: PurchaseQuotationItemEntity[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
