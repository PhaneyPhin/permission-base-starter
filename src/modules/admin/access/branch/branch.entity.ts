import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';

@Entity({ schema: 'admin', name: 'branch' })
export class BranchEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'code',
  })
  code: string;

  @Column({
    name: 'name_en',
  })
  nameEn: string;
  
  @Column({
    name: 'name_kh',
  })
  nameKh: string;
  
  @Column({
    name: 'contact_person',
  })
  contactPerson: string;
  
  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;
  
  @Column({
    name: 'address_en',
  })
  addressEn: string;
  
  @Column({
    name: 'address_kh',
  })
  addressKh: string;
  
  @Column({
    name: 'description',
  })
  description: string;
  

  @Column({
    name: 'active',
  })
  active: boolean;

  @Column({
    name: 'created_by',
  })
  createdBy: string;
  
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<BranchEntity>) {
    super();
    Object.assign(this, partial);
  }
}
