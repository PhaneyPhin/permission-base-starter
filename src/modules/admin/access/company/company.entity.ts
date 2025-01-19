import { UserEntity } from '@admin/access/users/user.entity';
import { BaseEntity } from '@database/entities';
import minioClient from '@libs/pagination/minio';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'admin', name: 'company' })
export class CompanyEntity extends BaseEntity {
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
    name: 'email',
    type: 'varchar',
    nullable: true,
  })
  email: string;
  
  @Column({
    name: 'website',
    type: 'varchar',
    nullable: true,
  })
  website: string;
  
  @Column({
    name: 'address_en',
    type: 'varchar',
    nullable: true,
  })
  addressEn: string;
  
  @Column({
    name: 'address_kh',
    type: 'varchar',
    nullable: true,
  })
  addressKh: string;
  
  @Column({
    name: 'logo',
    type: 'varchar',
    nullable: true,
  })
  logo: string;
  
  logoUrl: string;

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
  
  constructor(partial?: Partial<CompanyEntity>) {
    super();
    Object.assign(this, partial);
  }
  
  async getLogoUrl() {
    return await minioClient.presignedGetObject('images', this.logo);
  }
}
