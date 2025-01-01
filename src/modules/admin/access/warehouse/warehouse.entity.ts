import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'admin', name: 'warehouse' })
export class WarehouseEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'branch',
    type: 'varchar',
    nullable: true,
  })
  branch: string;
  
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
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;
  
  @Column({
    name: 'created_by',
    type: 'varchar',
    nullable: true,
  })
  createdBy: string;
  
  @Column({
    name: 'contact_phone',
    type: 'varchar',
    nullable: true,
  })
  contactPhone: string;
  

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<WarehouseEntity>) {
    super();
    Object.assign(this, partial);
  }
}
