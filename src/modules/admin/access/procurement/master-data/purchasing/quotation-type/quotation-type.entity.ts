import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PurchaseOrderTypeEntity } from "../purchase-order-type/purchase-order-type.entity";

@Entity({ schema: "admin", name: "quotation-type" })
export class QuotationTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "code",
    type: "varchar",
    nullable: true,
  })
  code: string;

  @Column({
    name: "name_en",
    type: "varchar",
    nullable: true,
  })
  nameEn: string;

  @Column({
    name: "name_kh",
    type: "varchar",
    nullable: true,
  })
  nameKh: string;

  @Column({
    name: "active",
    type: "boolean",
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({
    name: "created_by",
    type: "uuid",
    nullable: true,
  })
  createdBy: string;

  @Column({ name: "code_prefix" })
  codePrefix: string;

  @Column({ name: "default_po_type_id" })
  defaultPOTypeId: number;

  @ManyToOne(() => QuotationTypeEntity, { nullable: true })
  @JoinColumn({ name: "default_po_type_id" })
  defaultPOType: PurchaseOrderTypeEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  constructor(partial?: Partial<QuotationTypeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
