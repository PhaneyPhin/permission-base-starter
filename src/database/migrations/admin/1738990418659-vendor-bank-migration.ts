import { commonFields } from "@database/migrations/common.fields";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

const tableName = "admin.vendor-bank";

export class VendorBankMigration1737908491845 implements MigrationInterface {
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
            name: "vendor_id",
            type: "integer",
            isNullable: false,
          },

          {
            name: "bank_id",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "account_number",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "country_code",
            type: "varchar",
            length: "50",
            isNullable: false,
          },

          {
            name: "benifitsary_name",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "currency",
            type: "varchar",
            length: "160",
            default: "'USD'",
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
