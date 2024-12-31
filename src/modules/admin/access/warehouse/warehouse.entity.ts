import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'admin', name: 'warehouse' })
export class WarehouseEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 60,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 160,
  })
  description: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  constructor(partial?: Partial<WarehouseEntity>) {
    super();
    Object.assign(this, partial);
  }
}
