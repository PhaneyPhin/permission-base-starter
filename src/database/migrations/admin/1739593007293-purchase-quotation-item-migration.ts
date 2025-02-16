import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { commonFields } from "../common.fields";

const tableName = "admin.purchase-quotation-item";

export class PurchaseQuotationItemMigration1739593007292
  implements MigrationInterface
{
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
            name: "quotation_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "branch_id",
            type: "integer",
            isNullable: false,
          },

          {
            name: "project_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "warehouse_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "document_ref",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "line_document_ref",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "actual_date",
            type: "timestamp with time zone",
            isNullable: true,
          },

          {
            name: "line_item",
            type: "integer",
            isNullable: false,
          },
          {
            name: "item_code",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "item_name",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "unit",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "quantity",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "estimate_price",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "open_quantity",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "receipt_quantity",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "total_estimate_price",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "note",
            type: "varchar",
            length: "160",
            isNullable: false,
          },

          {
            name: "request_number",
            type: "varchar",
            length: "160",
            isNullable: true,
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
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "status",
            type: "varchar",
            length: "160",
            default: "'open'",
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
