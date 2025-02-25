import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { PurchaseOrderTypeEntity } from '../../master-data/purchasing/purchase-order-type/purchase-order-type.entity';
import { BranchEntity } from '@modules/admin/access/branch/branch.entity';
import { AnalysisCodeEntity } from '@modules/admin/access/construction/master-data/analysis-code/analysis-code.entity';
import { VendorEntity } from '@modules/admin/access/vendor/vendor/vendor.entity';
import { PurchaseOrderItemEntity } from './purchase-order-item.entity';

@Entity({ schema: 'admin', name: 'purchase-order' })
export class PurchaseOrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'po_number', type: 'varchar', unique: true, nullable: false })
  poNumber: string;

  @Column({ name: 'po_type_id', type: 'integer', nullable: false })
  poTypeId: number;

  @ManyToOne(() => PurchaseOrderTypeEntity, { nullable: true })
  @JoinColumn({ name: 'po_type_id' })
  poType: PurchaseOrderTypeEntity;

  @Column({ name: 'branch_id', type: 'integer', nullable: false })
  branchId: number;

  @ManyToOne(() => BranchEntity, { nullable: true })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({ name: 'project_id', type: 'integer', nullable: false })
  projectId: number;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: AnalysisCodeEntity;

  @Column({ name: 'vendor_id', type: 'integer', nullable: false })
  vendorId: number;

  @ManyToOne(() => VendorEntity, { nullable: true })
  @JoinColumn({ name: 'vendor_id' })
  vendor: VendorEntity;

  @Column({ name: 'vendor_name', type: 'varchar', nullable: true })
  vendorName: string;

  @Column({ name: 'po_date', type: 'timestamp with time zone', nullable: false })
  poDate: Date;

  @Column({ name: 'promised_date', type: 'timestamp with time zone', nullable: false })
  promisedDate: Date;

  @Column({ name: 'document_ref', type: 'varchar', nullable: true })
  documentRef: string;

  @Column({ name: 'second_ref', type: 'varchar', nullable: true })
  secondRef: string;

  @Column({ name: 'po_ref', type: 'varchar', nullable: true })
  poRef: string;

  @Column({ name: 'total_qty', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalQty: number;

  @Column({ name: 'open_qty', type: 'decimal', precision: 15, scale: 2, nullable: true })
  openQty: number;

  @Column({ name: 'receipt_qty', type: 'decimal', precision: 15, scale: 2, nullable: true })
  receiptQty: number;

  @Column({ name: 'net_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  netAmount: number;

  @Column({ name: 'total_discount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalDiscount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalAmount: number;

  @Column({ name: 'currency_code', type: 'varchar', nullable: false })
  currencyCode: string;

  @Column({ name: 'priority', type: 'varchar', nullable: true })
  priority: string;

  @Column({ name: 'attachements', type: 'varchar', nullable: true })
  attachements: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'is_approved', type: 'boolean', default: false, nullable: false })
  isApproved: boolean;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @Column({ name: 'active', type: 'boolean', default: true, nullable: false })
  active: boolean;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => PurchaseOrderItemEntity, (item) => item.purchaseOrder, {
      cascade: true,
    })
    items: PurchaseOrderItemEntity[];

  constructor(partial?: Partial<PurchaseOrderEntity>) {
    super();
    Object.assign(this, partial);
  }
}
