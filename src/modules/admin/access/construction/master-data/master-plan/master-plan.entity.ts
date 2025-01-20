import { UserEntity } from '@admin/access/users/user.entity';
import { BaseEntity } from '@database/entities';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MasterPlanStatus } from './enums/master-plan-status.enum';

@Entity({ schema: 'admin', name: 'master-plan' })
export class MasterPlanEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'unit_code',
    type: 'varchar',
    nullable: true,
  })
  unitCode: string;

  @Column({ name: 'status' })
  status: MasterPlanStatus
  
  @Column({
    name: 'project',
    type: 'varchar',
    nullable: true,
  })
  project: string;
  
  @Column({
    name: 'block',
    type: 'varchar',
    nullable: true,
  })
  block: string;
  
  @Column({
    name: 'building',
    type: 'varchar',
    nullable: true,
  })
  building: string;
  
  @Column({
    name: 'street',
    type: 'varchar',
    nullable: true,
  })
  street: string;
  
  @Column({
    name: 'unit_number',
    type: 'varchar',
    nullable: true,
  })
  unitNumber: string;
  
  @Column({
    name: 'division',
    type: 'varchar',
    nullable: true,
  })
  division: string;
  
  @Column({
    name: 'unit_type',
    type: 'varchar',
    nullable: true,
  })
  unitType: string;
  
  @Column({
    name: 'land_size',
    type: 'varchar',
    nullable: true,
  })
  landSize: string;
  
  @Column({
    name: 'unit_size',
    type: 'varchar',
    nullable: true,
  })
  unitSize: string;
  
  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;
  
  @Column({
    name: 'boq',
    type: 'varchar',
    nullable: true,
  })
  boq: string;
  
  @Column({
    name: 'start_build_date',
    type: 'varchar',
    nullable: true,
  })
  startBuildDate: string;
  
  @Column({
    name: 'end_build_date',
    type: 'varchar',
    nullable: true,
  })
  endBuildDate: string;
  
  @Column({
    name: 'actual_finish_date',
    type: 'varchar',
    nullable: true,
  })
  actualFinishDate: string;
  
  @Column({
    name: 'completed_percentage',
    type: 'varchar',
    nullable: true,
  })
  completedPercentage: string;
  
  @Column({
    name: 'duration',
    type: 'varchar',
    nullable: true,
  })
  duration: string;
  
  @Column({
    name: 'standard_cost',
    type: 'varchar',
    nullable: true,
  })
  standardCost: string;
  
  @Column({
    name: 'actual_cost',
    type: 'varchar',
    nullable: true,
  })
  actualCost: string;
  
  @Column({
    name: 'unearn_account',
    type: 'varchar',
    nullable: true,
  })
  unearnAccount: string;
  
  @Column({
    name: 'note',
    type: 'varchar',
    nullable: true,
  })
  note: string;
  
  @Column({
    name: 'is_handover',
    type: 'varchar',
    nullable: true,
  })
  isHandover: string;
  
  @Column({
    name: 'created_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string;
  
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: UserEntity;
  

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
  
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<MasterPlanEntity>) {
    super();
    Object.assign(this, partial);
  }
}
