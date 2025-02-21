import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { PurchaseRequestEntity } from './purchase-request.entity';
import { DepartmentEntity } from '@modules/admin/access/department/department.entity';

@Entity({ schema: 'admin', name: 'purchase-request-item' })
export class PurchaseRequestItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'purchase_request_id',
    type: 'integer',
    nullable: false,
  })
  purchaseRequestId: number;

  @Column({
    name: 'branch_id',
    type: 'integer',
    nullable: false,
  })
  branchId: number;

  @Column({
    name: 'project_id',
    type: 'integer',
    nullable: false,
  })
  projectId: number;

  @Column({
    name: 'actual_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  actualDate?: Date;

  @Column({
    name: 'line_item',
    type: 'integer',
    nullable: false,
  })
  lineItem: number;

  @Column({
    name: 'item_code',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  itemCode?: string;

  @Column({
    name: 'item_name',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  itemName?: string;

  @Column({
    name: 'unit_id',
    type: 'integer',
    nullable: false,
  })
  unitId: number;

  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  quantity?: number;

  @Column({
    name: 'estimation_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  estimationPrice?: number;

  @Column({
    name: 'open_qty',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  openQty?: number;

  @Column({
    name: 'receipt_qty',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  receiptQty?: number;

  @Column({
    name: 'total_estimate_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalEstimatePrice?: number;

  @Column({
    name: 'cost_center',
    type: 'integer',
    nullable: true,
  })
  costCenter: number;

  @Column({
    name: 'unit_code',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  unitCode?: string;

  @Column({
    name: 'note',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  note?: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 160,
    nullable: false,
  })
  status: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({
    name: 'created_by',
    type: 'uuid',
    nullable: true,
  })
  createdBy: string;

  @ManyToOne(() => DepartmentEntity, { nullable: true })
  @JoinColumn({ name: "cost_center" })
  costCenterBy: DepartmentEntity;

  @ManyToOne(() => PurchaseRequestEntity, { nullable: true })
  @JoinColumn({ name: "purchase_request_id" })
  purchaseRequest: PurchaseRequestEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;
  
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(partial?: Partial<PurchaseRequestItemEntity>) {
    super();
    Object.assign(this, partial);
  }
}