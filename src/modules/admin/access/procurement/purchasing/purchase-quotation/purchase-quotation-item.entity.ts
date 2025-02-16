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
import { PurchaseQuotationEntity } from "./purchase-quotation.entity";

@Entity({ schema: "admin", name: "purchase-quotation-item" })
export class PurchaseQuotationItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "quotation_id",
    type: "integer",
    nullable: false,
  })
  quotationId: string;

  @Column({
    name: "branch_id",
    type: "integer",
    nullable: false,
  })
  branchId: number;

  @Column({
    name: "project_id",
    type: "integer",
    nullable: false,
  })
  projectId: number;

  @Column({
    name: "warehouse_id",
    type: "integer",
    nullable: true,
  })
  warehouseId: number;

  @Column({
    name: "document_ref",
    type: "varchar",
    nullable: true,
  })
  documentRef: string;

  @Column({
    name: "line_document_ref",
    type: "varchar",
    nullable: true,
  })
  lineDocumentRef: string;

  @Column({
    name: "actual_date",
    type: "timestamp with time zone",
    nullable: true,
  })
  actualDate: Date;

  @Column({
    name: "line_item",
    type: "integer",
    nullable: true,
  })
  lineItem: number;

  @Column({
    name: "item_code",
    type: "varchar",
    nullable: false,
  })
  itemCode: string;

  @Column({
    name: "item_name",
    type: "varchar",
    nullable: false,
  })
  itemName: string;

  @Column({
    name: "unit",
    type: "varchar",
    nullable: false,
  })
  unit: string;

  @Column({
    name: "quantity",
    type: "double precision",
    nullable: false,
    default: 0,
  })
  quantity: number;

  @Column({
    name: "estimate_price",
    type: "double precision",
    nullable: true,
    default: 0,
  })
  estimatePrice: number;

  @Column({
    name: "open_quantity",
    type: "double precision",
    nullable: true,
    default: 0,
  })
  openQuantity: number;

  @Column({
    name: "receipt_quantity",
    type: "double precision",
    nullable: true,
    default: 0,
  })
  receiptQuantity: number;

  @Column({
    name: "total_estimate_price",
    type: "double precision",
    nullable: true,
    default: 0,
  })
  totalEstimatePrice: number;

  @Column({
    name: "note",
    type: "varchar",
    nullable: true,
  })
  note: string;

  @Column({
    name: "status",
    type: "varchar",
    length: "160",
    nullable: false,
    default: "open",
  })
  status: string;

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
    name: "updated_by",
    type: "uuid",
    nullable: true,
  })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @ManyToOne(() => PurchaseQuotationEntity, { nullable: true })
  @JoinColumn({ name: "quotation_id" })
  quotation: PurchaseQuotationEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor(partial?: Partial<PurchaseQuotationItemEntity>) {
    super();
    Object.assign(this, partial);
  }
}
