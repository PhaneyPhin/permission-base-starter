import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { commonFields } from "../common.fields";

const tableName = "admin.purchase-quotation";

export class PurchaseQuotationMigration1739594952188
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
            name: "quotation_number",
            type: "varchar",
            length: "160",
            isNullable: false,
          },
          {
            name: "quotation_type",
            type: "varchar",
            length: "160",
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
            name: "request_date",
            type: "timestamp with time zone",
            isNullable: false,
          },
          {
            name: "requested_by",
            type: "integer",
            isNullable: false,
          },
          {
            name: "total_qty",
            type: "double precision",
            default: 0,
          },
          {
            name: "open_qty",
            type: "double precision",
            default: 0,
          },
          {
            name: "receipt_qty",
            type: "double precision",
            default: 0,
          },
          {
            name: "total_cost",
            type: "double precision",
            default: 0,
          },
          {
            name: "is_approved",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "is_require_bidding",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "vendor_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "currency_code",
            type: "varchar",
            length: "160",
            isNullable: false,
          },
          {
            name: "document_reference",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
            length: "160",
            default: "'open'",
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

    // Foreign Key Relationships
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["branch_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.branch",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["project_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.analysis-code",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["requested_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.staff-profile",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["vendor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.vendor",
        onDelete: "SET NULL",
      })
    );

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
        columnNames: ["updated_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    if (table) {
      const foreignKeys = table.foreignKeys.filter((fk) =>
        [
          "branch_id",
          "project_id",
          "requested_by",
          "vendor_id",
          "created_by",
          "updated_by",
        ].includes(fk.columnNames[0])
      );

      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey(tableName, fk);
      }

      await queryRunner.dropTable(tableName, true);
    }
  }
}
