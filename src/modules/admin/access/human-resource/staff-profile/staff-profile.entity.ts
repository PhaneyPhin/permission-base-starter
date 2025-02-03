import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { BranchEntity } from '../../branch/branch.entity';
import { NationalityEntity } from '../master-data/nationality/nationality.entity';
import { PositionEntity } from '../master-data/position/position.entity';
import { DepartmentEntity } from '../../department/department.entity';
import { StaffStatus } from './enams/staff-status.enum';
import { Gender } from './enams/gender.enum';
import { Title } from './enams/title.enum';
import { MaritalStatus } from './enams/maritalStatus.enum';

@Entity({ schema: 'admin', name: 'staff-profile' })
export class StaffProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'staff_code',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  staffCode: string;
  
  @Column({
    name: 'name_en',
    type: 'varchar',
    nullable: true,
  })
  nameEn: string;
  
  @Column({
    name: 'name_kh',
    type: 'varchar',
    nullable: true,
  })
  nameKh: string;
  
  @Column({
    name: 'sex',
    type: 'varchar',
    nullable: true,
  })
  sex: string;

  
  @Column({
    name: 'title',
    type: 'varchar',
    nullable: true,
  })
  title: string;
  
  @Column({
    name: 'date_of_birth',
    type: 'varchar',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    name: 'nationality',
    type: 'varchar',
    nullable: true,
  })
  maritalStatus: string;

  @Column({
    name: 'nationality',
    type: 'varchar',
    nullable: true,
  })
  nationality: string;
  
  @Column({
    name: 'religion',
    type: 'varchar',
    nullable: true,
  })
  religion: string;
  
  @Column({
    name: 'company_card_no',
    type: 'varchar',
    nullable: true,
  })
  companyCardNo: string;
  
  @Column({
    name: 'identity_id',
    type: 'varchar',
    nullable: true,
  })
  identityId: string;
  
  @Column({
    name: 'phone1',
    type: 'varchar',
    nullable: true,
  })
  phone1: string;
  
  @Column({
    name: 'phone2',
    type: 'varchar',
    nullable: true,
  })
  phone2: string;
  
  @Column({
    name: 'working_email',
    type: 'varchar',
    nullable: true,
  })
  workingEmail: string;
  
  @Column({
    name: 'personal_email',
    type: 'varchar',
    nullable: true,
  })
  personalEmail: string;
  
  @Column({
    name: 'place_of_birth',
    type: 'varchar',
    nullable: true,
  })
  placeOfBirth: string;
  
  @Column({
    name: 'branch_id',
    type: 'varchar',
    nullable: true,
  })
  branchId: number;

  @ManyToOne(() => BranchEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
  
  @Column({
    name: 'department_id',
    type: 'varchar',
    nullable: true,
  })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
  
  @Column({
    name: 'position_id',
    type: 'varchar',
    nullable: true,
  })
  positionId: number;

  @ManyToOne(() => PositionEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'position_id' })
  position: PositionEntity;
  
  @Column({
    name: 'hired_date',
    type: 'varchar',
    nullable: true,
  })
  hiredDate: Date;
  
  @Column({
    name: 'permanent_address',
    type: 'varchar',
    nullable: true,
  })
  permanentAddress: string;
  
  @Column({
    name: 'curren_address',
    type: 'varchar',
    nullable: true,
  })
  currenAddress: string;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    nullable: true,
  })
  profileImage: string;

  @Column({
    name: 'signature_image',
    type: 'varchar',
    nullable: true,
  })
  signatureImage: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StaffStatus,
    nullable: false,
  })
  status: StaffStatus;

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
  constructor(partial?: Partial<StaffProfileEntity>) {
    super();
    Object.assign(this, partial);
  }
}
