import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { DepartmentEntity } from '@modules/admin/access/department/department.entity';
import { EmployeePositionEntity } from '../employee-position/employee-position.entity';
import { Gender } from './gender.enum';

@Entity({ schema: 'admin', name: 'employee' })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'employee_code',
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  employeeCode: string;
  
  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName: string;
  
  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName: string;
  
  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;
  
  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;
  
  @Column({
    name: 'contact_number',
    type: 'varchar',
    nullable: true,
  })
  contactNumber: string;
  
  @Column({
    name: 'email_address',
    type: 'varchar',
    nullable: true,
  })
  emailAddress: string;
  
  @Column({
    name: 'department_id',
    type: 'varchar',
    nullable: true,
  })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
  
  @Column({
    name: 'position_id',
    type: 'varchar',
    nullable: true,
  })
  positionId: number;

  @ManyToOne(() => EmployeePositionEntity, { nullable: true })
  @JoinColumn({ name: 'position_id' })
  position: EmployeePositionEntity;
  
  @Column({
    name: 'hire_date',
    type: 'date',
    nullable: true,
  })
  hireDate: Date;
  
  @Column({
    name: 'remark',
    type: 'varchar',
    nullable: true,
  })
  remark: string;
  

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
  constructor(partial?: Partial<EmployeeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
