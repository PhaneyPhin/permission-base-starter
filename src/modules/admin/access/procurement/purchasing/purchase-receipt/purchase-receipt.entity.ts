import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import { PaymentTermEntity } from "@modules/admin/access/bank-classification/payment-term/payment-term.entity";
import { BranchEntity } from "@modules/admin/access/branch/branch.entity";
import { AnalysisCodeEntity } from "@modules/admin/access/construction/master-data/analysis-code/analysis-code.entity";
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
import { PurchaseReceiptTypeEntity } from "../../master-data/purchasing/purchase-receipt-type/purchase-receipt-type.entity";
import { PurchaseReceiptItemEntity } from "./purchase-receipt-item.entity";

@Entity({ schema: "admin", name: "purchase-receipt" })
export class PurchaseReceiptEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "receipt_number",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  receiptNumber: string;

  @Column({ name: "pr_type_id", type: "integer", nullable: false })
  prTypeId: number;

  @ManyToOne(() => PurchaseReceiptTypeEntity, { nullable: true })
  @JoinColumn({ name: "pr_type_id" })
  poType: PurchaseReceiptTypeEntity;

  @Column({ name: "branch_id", type: "integer", nullable: false })
  branchId: number;

  @ManyToOne(() => BranchEntity, { nullable: true })
  @JoinColumn({ name: "branch_id" })
  branch: BranchEntity;

  @Column({ name: "project_id", type: "integer", nullable: false })
  projectId: number;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true })
  @JoinColumn({ name: "project_id" })
  project: AnalysisCodeEntity;

  @Column({ name: "vendor_id", type: "integer", nullable: false })
  vendorId: number;

  @ManyToOne(() => VendorEntity, { nullable: true })
  @JoinColumn({ name: "vendor_id" })
  vendor: VendorEntity;

  @ManyToOne(() => PaymentTermEntity, { nullable: true })
  @JoinColumn({ name: "payment_term_id" })
  paymentTerm: PaymentTermEntity;

  @Column({ name: "vendor_name", type: "varchar", nullable: true })
  vendorName: string;

  @Column({
    name: "receipt_date",
    type: "timestamp with time zone",
    nullable: false,
  })
  receiptDate: Date;

  @Column({ name: "document_ref", type: "varchar", nullable: true })
  documentRef: string;

  @Column({ name: "posting_period", type: "varchar", nullable: true })
  postingPeriod: string;

  @Column({ name: "second_ref", type: "varchar", nullable: true })
  secondRef: string;

  @Column({ name: "pr_ref", type: "varchar", nullable: true })
  poRef: string;

  @Column({ name: "billing_date", nullable: true })
  billingDate: Date;

  @Column({
    name: "total_percentage_discount",
    type: "varchar",
    nullable: true,
  })
  totalPercentageDiscount: number;

  @Column({ name: "receipt_ref", type: "varchar", nullable: true })
  receiptRef: number;

  @Column({
    name: "total_qty",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalQty: number;

  @Column({
    name: "open_qty",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  openQty: number;

  @Column({
    name: "receipt_qty",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  receiptQty: number;

  @Column({
    name: "net_amount",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  netAmount: number;

  @Column({
    name: "total_discount",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalDiscount: number;

  @Column({
    name: "total_amount",
    type: "decimal",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalAmount: number;

  @Column({ name: "currency_code", type: "varchar", nullable: false })
  currencyCode: string;

  @Column({ name: "attachements", type: "varchar", nullable: true })
  attachements: string;

  @Column({ name: "description", type: "varchar", nullable: true })
  description: string;

  @Column({ name: "status", type: "varchar", nullable: false })
  status: string;

  @Column({ name: "active", type: "boolean", default: true, nullable: false })
  active: boolean;

  @Column({ name: "created_by", type: "uuid", nullable: true })
  createdBy: string;

  @Column({ name: "updated_by", type: "uuid", nullable: true })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => PurchaseReceiptItemEntity, (item) => item.purchaseReceipt, {
    cascade: true,
  })
  items: PurchaseReceiptItemEntity[];

  constructor(partial?: Partial<PurchaseReceiptEntity>) {
    super();
    Object.assign(this, partial);
  }
}
