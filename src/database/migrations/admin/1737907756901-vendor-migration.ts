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
            name: "phone_number",
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
            length: "160",
            isNullable: true,
          },
          {
            name: "payment_term_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "vendor_type_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "vendor_group_id",
            type: "integer",
            isNullable: false,
          },

          {
            name: "payment_method_id",
            type: "integer",
            isNullable: false,
          },

          {
            name: "created_by",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          ...commonFields,
        ],
      }),
      true
    );

    // Add the foreign key constraint
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["created_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("created_by") !== -1
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);
    await queryRunner.dropTable(tableName, true);
  }
}
