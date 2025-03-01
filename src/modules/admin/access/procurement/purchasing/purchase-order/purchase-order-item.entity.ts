import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { PurchaseOrderEntity } from './purchase-order.entity';

@Entity({ schema: 'admin', name: 'purchase-order-item' })
export class PurchaseOrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'po_id', type: 'integer', nullable: true })
  poId: number;

  @Column({ name: 'branch_id', type: 'integer', nullable: true })
  branchId: number;

  @Column({ name: 'project_id', type: 'integer', nullable: true })
  projectId: number;

  @Column({ name: 'line_item', type: 'integer', nullable: true })
  lineItem: number;

  @Column({ name: 'item_code', type: 'varchar', length: 160, nullable: true })
  itemCode: string;

  @Column({ name: 'item_name', type: 'varchar', length: 160, nullable: true })
  itemName: string;

  @Column({ name: 'unit', type: 'varchar', length: 160, nullable: true })
  unit: string;

  @Column({ name: 'item_type', type: 'varchar', length: 160, nullable: true })
  itemType: string;

  @Column({ name: 'quantity', type: 'decimal', precision: 15, scale: 2, nullable: true })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  unitPrice: number;

  @Column({ name: 'discount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  discount: number;

  @Column({ name: 'percentage_discount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  percentageDiscount: number;

  @Column({ name: 'net_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  netAmount: number;

  @Column({ name: 'amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  amount: number;

  @Column({ name: 'open_quantity', type: 'decimal', precision: 15, scale: 2, nullable: true })
  openQuantity: number;

  @Column({ name: 'receipt_quantity', type: 'decimal', precision: 15, scale: 2, nullable: true })
  receiptQuantity: number;

  @Column({ name: 'note', type: 'varchar', length: 500, nullable: true })
  note: string;

  @Column({ name: 'cost_center', type: 'integer', nullable: true })
  costCenter: number;

  @Column({ name: 'request_date', type: 'timestamptz', nullable: true })
  requestDate: Date;

  @Column({ name: 'promised_date', type: 'timestamptz', nullable: true })
  promisedDate: Date;

  @Column({ name: 'unit_code', type: 'varchar', length: 160, nullable: true })
  unitCode: string;

  @Column({ name: 'status', type: 'varchar', length: 160, nullable: true })
  status: string;

  @Column({ name: 'document_ref', type: 'varchar', length: 160, nullable: true })
  documentRef: string;

  @Column({ name: 'line_document_ref', type: 'varchar', length: 160, nullable: true })
  lineDocumentRef: string;

  @Column({ name: 'second_ref', type: 'varchar', length: 160, nullable: true })
  secondRef: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @Column({ name: 'active', type: 'boolean', nullable: true, default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: UserEntity;

  @ManyToOne(() => PurchaseOrderEntity, { nullable: true })
  @JoinColumn({ name: "po_id" })
  purchaseOrder: PurchaseOrderEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial?: Partial<PurchaseOrderItemEntity>) {
    super();
    Object.assign(this, partial);
  }
}
