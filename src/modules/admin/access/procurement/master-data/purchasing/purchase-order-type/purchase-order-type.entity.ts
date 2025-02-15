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
import { PurchaseReceiptTypeEntity } from "../purchase-receipt-type/purchase-receipt-type.entity";

@Entity({ schema: "admin", name: "purchase-order-type" })
export class PurchaseOrderTypeEntity extends BaseEntity {
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

  @Column({ name: "default_pr_type_id" })
  defaultPRTypeId: number;

  @ManyToOne(() => PurchaseReceiptTypeEntity, { nullable: true })
  @JoinColumn({ name: "default_pr_type_id" })
  defaultPRType: PurchaseReceiptTypeEntity;

  @Column({ name: "code_prefix" })
  codePrefix: string;

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
  constructor(partial?: Partial<PurchaseOrderTypeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
