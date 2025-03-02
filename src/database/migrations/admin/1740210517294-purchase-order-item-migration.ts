import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { commonFields } from "../common.fields";

const tableName = "admin.purchase-receipt-item";

export class PurchaseReceiptItemMigration1740210517294
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
            name: "pr_id",
            type: "integer",
            isNullable: true,
          },

          {
            name: "branch_id",
            type: "integer",
            isNullable: true,
          },

          {
            name: "project_id",
            type: "integer",
            isNullable: true,
          },

          {
            name: "line_item",
            type: "integer",
            isNullable: true,
          },

          {
            name: "item_code",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "item_name",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "unit",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "item_type",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "quantity",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "unit_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "discount",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "percentage_discount",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "net_amount",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "open_quantity",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "receipt_quantity",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },

          {
            name: "note",
            type: "varchar",
            length: "500",
            isNullable: true,
          },

          {
            name: "cost_center",
            type: "integer",
            isNullable: true,
          },

          {
            name: "unit_code",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "status",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "document_ref",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "line_document_ref",
            type: "varchar",
            length: "160",
            isNullable: true,
          },

          {
            name: "second_ref",
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
            isNullable: true,
            default: true,
          },
          ...commonFields,
        ],
      }),
      true
    );

    // Add Foreign Key Constraints
    const foreignKeys = [
      { column: "pr_id", refTable: "admin.purchase-receipt" },
      { column: "branch_id", refTable: "admin.branch" },
      { column: "project_id", refTable: "admin.analysis-code" },
      { column: "line_item", refTable: "admin.item" },
      { column: "cost_center", refTable: "admin.department" },
      { column: "created_by", refTable: "admin.users" },
      { column: "updated_by", refTable: "admin.users" },
    ];

    for (const fk of foreignKeys) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          columnNames: [fk.column],
          referencedColumnNames: ["id"],
          referencedTableName: fk.refTable,
          onDelete: "SET NULL",
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (table) {
      for (const fk of table.foreignKeys) {
        await queryRunner.dropForeignKey(tableName, fk);
      }
      await queryRunner.dropTable(tableName, true);
    }
  }
}
