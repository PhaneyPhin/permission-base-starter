import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';

@Entity({ schema: 'admin', name: 'payment-term' })
export class PaymentTermEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
  })
  name: string;
  
  @Column({
    name: 'days_due',
    type: 'varchar',
    nullable: true,
  })
  daysDue: string;
  
  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;
  

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
  constructor(partial?: Partial<PaymentTermEntity>) {
    super();
    Object.assign(this, partial);
  }
}
