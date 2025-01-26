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
import { AnalysisCodeEntity } from "../analysis-code/analysis-code.entity";
import { MasterPlanStatus } from "./enums/master-plan-status.enum";

@Entity({ schema: "admin", name: "master-plan" })
export class MasterPlanEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "integer" })
  id: number;

  @Column({
    name: "unit_code",
    type: "varchar",
    nullable: true,
  })
  unitCode: string;

  @Column({ name: "status" })
  status: MasterPlanStatus;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "project" })
  project: AnalysisCodeEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "block" })
  block: AnalysisCodeEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "building" })
  building: AnalysisCodeEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "street" })
  street: AnalysisCodeEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "division" })
  division: AnalysisCodeEntity;

  @ManyToOne(() => AnalysisCodeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: "unit_type" })
  unitType: AnalysisCodeEntity;

  @Column({
    name: "unit_number",
    type: "varchar",
    nullable: true,
  })
  unitNumber: string;

  @Column({
    name: "land_size",
    type: "varchar",
    nullable: true,
  })
  landSize: string;

  @Column({
    name: "unit_size",
    type: "varchar",
    nullable: true,
  })
  unitSize: string;

  @Column({
    name: "description",
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    name: "boq",
    type: "varchar",
    nullable: true,
  })
  boq: string;

  @Column({
    name: "start_build_date",
    type: "varchar",
    nullable: true,
  })
  startBuildDate: string;

  @Column({
    name: "end_build_date",
    type: "varchar",
    nullable: true,
  })
  endBuildDate: string;

  @Column({
    name: "actual_finish_date",
    type: "varchar",
    nullable: true,
  })
  actualFinishDate: Date;

  @Column({
    name: "completed_percentage",
    type: "varchar",
    nullable: true,
  })
  completedPercentage: string;

  @Column({
    name: "duration",
    type: "varchar",
    nullable: true,
  })
  duration: string;

  @Column({
    name: "standard_cost",
    type: "varchar",
    nullable: true,
  })
  standardCost: string;

  @Column({
    name: "actual_cost",
    type: "varchar",
    nullable: true,
  })
  actualCost: string;

  @Column({
    name: "unearn_account",
    type: "varchar",
    nullable: true,
  })
  unearnAccount: string;

  @Column({
    name: "note",
    type: "varchar",
    nullable: true,
  })
  note: string;

  @Column({
    name: "is_handover",
    type: "varchar",
    nullable: true,
  })
  isHandover: string;

  @Column({
    name: "created_by",
    type: "uuid",
    nullable: true,
  })
  createdBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "created_by" })
  createdByUser: UserEntity;

  @Column({
    name: "updated_by",
    type: "uuid",
    nullable: true,
  })
  updatedBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updatedByUser: UserEntity;

  @Column({
    name: "active",
    type: "boolean",
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({ name: "attachments", type: "jsonb", nullable: true })
  attachments: string[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor(partial?: Partial<MasterPlanEntity>) {
    super();
    Object.assign(this, partial);
  }
}
