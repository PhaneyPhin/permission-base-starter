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

@Entity({ schema: "admin", name: "request-type" })
export class RequestTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "code",
    type: "varchar",
    nullable: true,
  })
  code: string;

  @Column({
    name: "name",
    type: "varchar",
    nullable: true,
  })
  name: string;

  @Column({
    name: "number_rank",
    type: "varchar",
    nullable: true,
  })
  numberRank: string;

  @Column({
    name: "approval_flow",
    type: "varchar",
    nullable: true,
  })
  approvalFlow: string;

  @Column({
    name: "default_qoatation",
    type: "varchar",
    nullable: true,
  })
  defaultQuotation: string;

  @Column({
    name: "is_require_approval",
  })
  isRequireApproval: boolean;

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
  constructor(partial?: Partial<RequestTypeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
