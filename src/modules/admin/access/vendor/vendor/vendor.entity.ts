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

@Entity({ schema: "admin", name: "vendor" })
export class VendorEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

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
    name: "contact_person",
    type: "varchar",
    nullable: true,
  })
  contactPerson: string;

  @Column({
    name: "phone_number",
    type: "varchar",
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: "email",
    type: "varchar",
    nullable: true,
  })
  email: string;

  @Column({
    name: "address",
    type: "varchar",
    nullable: true,
  })
  address: string;

  @Column({
    name: "payment_term_id",
    type: "varchar",
    nullable: true,
  })
  paymentTermId: string;

  @Column({
    name: "payment_method_id",
    type: "varchar",
    nullable: true,
  })
  paymentMethodId: string;

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
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  constructor(partial?: Partial<VendorEntity>) {
    super();
    Object.assign(this, partial);
  }
}
