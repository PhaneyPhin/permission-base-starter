import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';

@Entity({ schema: 'admin', name: 'vendor-bank' })
export class VendorBankEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'vendor_id',
    type: 'varchar',
    nullable: true,
  })
  vendorId: string;
  
  @Column({
    name: 'bank_id',
    type: 'varchar',
    nullable: true,
  })
  bankId: string;
  
  @Column({
    name: 'account_number',
    type: 'varchar',
    nullable: true,
  })
  accountNumber: string;
  
  @Column({
    name: 'account_holder_name',
    type: 'varchar',
    nullable: true,
  })
  accountHolderName: string;
  
  @Column({
    name: 'currency',
    type: 'varchar',
    nullable: true,
  })
  currency: string;
  

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
  constructor(partial?: Partial<VendorBankEntity>) {
    super();
    Object.assign(this, partial);
  }
}
