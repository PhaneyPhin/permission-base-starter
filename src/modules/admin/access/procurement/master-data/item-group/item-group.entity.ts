import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';

@Entity({ schema: 'admin', name: 'item-group' })
export class ItemGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'code',
    type: 'varchar',
    nullable: false,
  })
  code: string;
  
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
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'is_stock_item',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isStockItem: boolean;

  @Column({
    name: 'is_non_stock_item',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isNonStockItem: boolean;
  

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
  constructor(partial?: Partial<ItemGroupEntity>) {
    super();
    Object.assign(this, partial);
  }
}
