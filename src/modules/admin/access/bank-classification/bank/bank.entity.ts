import { UserEntity } from "@admin/access/users/user.entity";
import { BaseEntity } from "@database/entities";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "admin", name: "bank" })
export class BankEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "code",
    type: "varchar",
    nullable: true,
  })
  code: string;

  @Column({
    name: "country_code",
    type: "varchar",
    nullable: true,
  })
  countryCode: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: true,
  })
  name: string;

  @Column({
    name: "address",
    type: "varchar",
    nullable: true,
  })
  address: string;

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

  @DeleteDateColumn({ name: "deleted_at" }) // Automatically managed by TypeORM for soft deletes
  deletedAt?: Date; // Optional, null if not deleted

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  constructor(partial?: Partial<BankEntity>) {
    super();
    Object.assign(this, partial);
  }
}
