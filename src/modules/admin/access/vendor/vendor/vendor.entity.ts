import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentMethodEntity } from "../../bank-classification/payment-method/payment-method.entity";
import { PaymentTermEntity } from "../../bank-classification/payment-term/payment-term.entity";
import { VendorBankEntity } from "../vendor-bank/vendor-bank.entity";
import { VendorClassEntity } from "../vendor-class/vendor-class.entity";
import { VendorTypeEntity } from "../vendor-type/vendor-type.entity";
import { Attachment } from "./dtos/attachment.dto";
@Entity({ schema: "admin", name: "vendor" })
export class VendorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  status: string;

  @Column({ name: "name_en" })
  nameEn: string;

  @Column({ name: "name_kh" })
  nameKh: string;

  @Column({ name: "contact_person", nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  phone1: string;

  @Column({ nullable: true })
  phone2: string;

  @Column({ name: "working_email", nullable: true })
  workingEmail: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: "vendor_group_id", nullable: true })
  vendorGroupId: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ name: "created_by", default: true })
  createdBy: string;

  @Column({ name: "updated_by", default: true })
  updatedBy: string;

  @Column({ type: "jsonb", nullable: true })
  attachments: Attachment[];

  /** RELATIONSHIPS **/

  // Many-to-One: Vendor Type
  @ManyToOne(() => VendorTypeEntity, { nullable: false })
  @JoinColumn({ name: "vendor_type_id" })
  vendorType: VendorTypeEntity;

  // Many-to-One: Vendor Class
  @ManyToOne(() => VendorClassEntity, { nullable: false })
  @JoinColumn({ name: "vendor_class_id" })
  vendorClass: VendorClassEntity;

  // Many-to-One: Payment Term
  @ManyToOne(() => PaymentTermEntity, { nullable: true })
  @JoinColumn({ name: "payment_term_id" })
  paymentTerm: PaymentTermEntity;

  // Many-to-One: Payment Method
  @ManyToOne(() => PaymentMethodEntity, { nullable: true })
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: PaymentMethodEntity;

  // One-to-Many: Vendor Banks
  @OneToMany(() => VendorBankEntity, (vendorBank) => vendorBank.vendor, {
    cascade: true,
  })
  vendorBanks: VendorBankEntity[];

  // Many-to-One: Created By User
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  // Many-to-One: Created By User
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  /** TIMESTAMPS **/
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial?: Partial<VendorEntity>) {
    super();
    Object.assign(this, partial);
  }
}
