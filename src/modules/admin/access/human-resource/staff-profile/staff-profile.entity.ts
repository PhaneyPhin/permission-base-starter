import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { BranchEntity } from '../../branch/branch.entity';
import { DepartmentEntity } from '../../department/department.entity';
import { EmployeePositionEntity } from '../master-data/employee-position/employee-position.entity';
import minioClient from '@libs/pagination/minio';
import { ModuleStatus } from '@common/enums/status.enum';

@Entity({ schema: 'admin', name: 'staff-profile' })
export class StaffProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'staff_code',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  staffCode: string;
  
  @Column({
    name: 'name_en',
    type: 'varchar',
    nullable: false,
  })
  nameEn: string;
  
  @Column({
    name: 'name_kh',
    type: 'varchar',
    nullable: false,
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
    name: 'marital_status',
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
    nullable: false,
  })
  branchId: number;

  @ManyToOne(() => BranchEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
  
  @Column({
    name: 'department_id',
    type: 'varchar',
    nullable: false,
  })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
  
  @Column({
    name: 'position_id',
    type: 'varchar',
    nullable: false,
  })
  positionId: number;

  @ManyToOne(() => EmployeePositionEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'position_id' })
  position: EmployeePositionEntity;
  
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

  profileImageUrl: string;

  @Column({
    name: 'signature_image',
    type: 'varchar',
    nullable: true,
  })
  signatureImage: string;

  signatureImageUrl: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ModuleStatus,
    nullable: false,
  })
  status: ModuleStatus;

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
  async getProfileImageUrl(): Promise<string | null> {
      if (!this.profileImage) {
        return null;
      }
      return await minioClient.presignedGetObject('images', this.profileImage);
  }

  async getSignatureImageUrl(): Promise<string | null> {
      if (!this.signatureImage) {
        return null;
      }
      return await minioClient.presignedGetObject('images', this.signatureImage);
  }
}
