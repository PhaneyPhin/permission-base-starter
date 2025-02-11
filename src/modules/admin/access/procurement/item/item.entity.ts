import { BaseEntity } from '@database/entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@admin/access/users/user.entity';
import { CategoryEntity } from '../master-data/category/category.entity';
import { UomEntity } from '../master-data/uom/uom.entity';
import { ValuationMethodEntity } from '../master-data/valuation-method/valuation-method.entity';
// import { Status } from './status-enum';
import minioClient from '@libs/pagination/minio';
import { ItemType } from './item-type-enum';
import { ItemGroupEntity } from '../master-data/item-group/item-group.entity';
import { ModuleStatus } from '@common/enums/status.enum';

@Entity({ schema: 'admin', name: 'item' })
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'code',
    type: 'varchar',
    nullable: false,
    unique: true,
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
    name: 'item_group_id',
    type: 'integer',
    nullable: false,
  })
  itemGroupId: number;

  @ManyToOne(() => ItemGroupEntity, { nullable: true })
  @JoinColumn({ name: 'item_group_id' })
  itemGroup: ItemGroupEntity;

  @Column({
    name: 'category_id',
    type: 'integer',
    nullable: false,
  })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
  
  @Column({
    name: 'uom_id',
    type: 'integer',
    nullable: false,
  })
  uomId: number;

  @ManyToOne(() => UomEntity, { nullable: true })
  @JoinColumn({ name: 'uom_id' })
  uom: UomEntity;

  @Column({
    name: 'valuation_method_id',
    type: 'integer',
    nullable: true,
  })
  valuationMethodId: number;

  @ManyToOne(() => ValuationMethodEntity, { nullable: true })
  @JoinColumn({ name: 'valuation_method_id' })
  valuationMethod: ValuationMethodEntity;

  @Column({
    name: 'item_type',
    type: 'enum',
    enum: ItemType,
    nullable: false,
  })
  itemType: ItemType;

  @Column({
    name: 'min_stock',
    type: 'integer',
    nullable: true,
  })
  minStock: number;

  @Column({
    name: 'standard_cost',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  standardCost: number;

  @Column({
    name: 'unit_cost',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  unitCost: number;

  @Column({
    name: 'item_image',
    type: 'varchar',
    nullable: true,
  })
  itemImage: string;

  itemImageUrl: string;
  
  @Column({
    name: 'note',
    type: 'varchar',
    nullable: true,
  })
  note: string;
  

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

  @Column({
    name: 'updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string;
  
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: UserEntity;
  

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<ItemEntity>) {
    super();
    Object.assign(this, partial);
  }
  async getItemImageUrl(): Promise<string | null> {
    if (!this.itemImage) {
      return null;
    }
    return await minioClient.presignedGetObject('images', this.itemImage);
}
}
