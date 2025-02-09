import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { commonFields } from "../common.fields";

const tableName = "admin.vendor";

export class VendorMigration1737907756901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "id",
            type: "integer",
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "code",
            type: "varchar",
            length: "160",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "name_en",
            type: "varchar",
            length: "160",
            isNullable: false,
          },
          {
            name: "name_kh",
            type: "varchar",
            length: "160",
            isNullable: false,
          },
          {
            name: "contact_person",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "phone1",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "phone2",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "working_email",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "payment_term_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "vendor_type_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "vendor_class_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "vendor_group_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "payment_method_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "title",
            type: "varchar",
            length: "10",
            isNullable: true,
          },
          {
            name: "attachments",
            type: "json",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "created_by",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "updated_by",
            type: "uuid",
            isNullable: true,
          },
          ...commonFields,
        ],
      }),
      true
    );

    // Add Foreign Key Constraints
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["created_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.users",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["vendor_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.vendor-type",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["vendor_class_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.vendor-class",
        onDelete: "CASCADE",
      })
    );

    // await queryRunner.createForeignKey(
    //   tableName,
    //   new TableForeignKey({
    //     columnNames: ["vendor_group_id"],
    //     referencedColumnNames: ["id"],
    //     referencedTableName: "admin.vendor-group",
    //     onDelete: "CASCADE",
    //   })
    // );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["payment_term_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.payment-term",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["payment_method_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.payment-method",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    if (table) {
      // Drop all foreign keys before dropping the table
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey(tableName, fk);
      }
      await queryRunner.dropTable(tableName, true);
    }
  }
}
