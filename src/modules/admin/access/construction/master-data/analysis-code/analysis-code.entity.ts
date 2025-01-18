import { UserEntity } from '@admin/access/users/user.entity';
import { BaseEntity } from '@database/entities';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DimensionEntity } from '../dimension/dimension.entity';

@Entity({ schema: 'admin', name: 'analysis-code' })
export class AnalysisCodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  
  @Column({
    name: 'dimension_id',
    type: 'varchar',
    nullable: true,
  })
  dimensionId: number;
  
  @ManyToOne(() => DimensionEntity, { nullable: true })
  @JoinColumn({ name: 'dimension_id' })
  dimension: DimensionEntity;

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: true,
  })
  code: string;
  
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
  constructor(partial?: Partial<AnalysisCodeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
