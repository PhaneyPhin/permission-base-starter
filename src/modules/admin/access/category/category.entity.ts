import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';

@Entity({ schema: 'admin', name: 'category' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'code',
    type: 'varchar',
    unique: true,
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
    name: 'parent_id',
    type: 'integer',
    nullable: true,
  })
  parentId: number | null;

  @ManyToOne(() => CategoryEntity, (category) => category.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
  
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
  constructor(partial?: Partial<CategoryEntity>) {
    super();
    Object.assign(this, partial);
  }
}
