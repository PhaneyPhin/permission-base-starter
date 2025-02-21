import { BaseEntity } from '@database/entities';
import { 
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, 
  OneToMany
} from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { AnalysisCodeEntity } from '@modules/admin/access/construction/master-data/analysis-code/analysis-code.entity';
import { BranchEntity } from '@modules/admin/access/branch/branch.entity';
import { DepartmentEntity } from '@modules/admin/access/department/department.entity';
import { RequestTypeEntity } from '../../master-data/purchasing/request-type/request-type.entity';
import { PurchaseRequestItemEntity } from './purchase-request-item.entity';
import { StaffProfileEntity } from '@modules/admin/access/human-resource/staff-profile/staff-profile.entity';

@Entity({ schema: 'admin', name: 'purchase-request' })
export class PurchaseRequestEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'request_number',
    type: 'varchar',
    length: 160,
    nullable: false,
  })
  requestNumber: string;

  @Column({
    name: 'request_type_id',
    type: 'integer',
    nullable: false,
  })
  requestTypeId: number;

  @ManyToOne(() => RequestTypeEntity, { nullable: false })
  @JoinColumn({ name: "request_type_id" })
  requestType: RequestTypeEntity;

  @Column({
    name: 'department_id',
    type: 'integer',
    nullable: false,
  })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { nullable: false })
  @JoinColumn({ name: "department_id" })
  department: DepartmentEntity;

  @Column({
    name: 'branch_id',
    type: 'integer',
    nullable: false,
  })
  branchId: number;

  @ManyToOne(() => BranchEntity, { nullable: false })
  @JoinColumn({ name: "branch_id" })
  branch: BranchEntity;

  @Column({
    name: 'project_id',
    type: 'integer',
    nullable: false,
  })
  projectId: number;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: false })
  @JoinColumn({ name: "project_id" })
  project: AnalysisCodeEntity;

  @Column({
    name: 'request_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  requestDate: Date;

  @Column({
    name: 'required_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  requiredDate: Date;

  @Column({
    name: 'total_qty',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalQty: number;

  @Column({
    name: 'open_qty',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  openQty: number;

  @Column({
    name: 'receipt_qty',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  receiptQty: number;

  @Column({
    name: 'total_cost',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalCost: number;

  @Column({
    name: 'total_estimated_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  totalEstimatedPrice: number;

  @Column({
    name: 'requested_by',
    type: 'integer',
    nullable: false,
  })
  requestedBy: number;

    @ManyToOne(() => StaffProfileEntity, { nullable: false })
    @JoinColumn({ name: "requested_by" })
    requestedByUser: StaffProfileEntity;
  

  @Column({
    name: 'priority',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  priority: string;

  @Column({
    name: 'currency_code',
    type: 'varchar',
    length: 160,
    nullable: false,
  })
  currencyCode: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 160,
    nullable: false,
  })
  status: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 160,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'is_approved',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isApproved: boolean;

  @Column({
    name: 'active',
    type: 'boolean',
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

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @Column({
    name: 'updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @OneToMany(() => PurchaseRequestItemEntity, (item) => item.purchaseRequest, {
      cascade: true,
    })
    items: PurchaseRequestItemEntity[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(partial?: Partial<PurchaseRequestEntity>) {
    super();
    Object.assign(this, partial);
  }
}
