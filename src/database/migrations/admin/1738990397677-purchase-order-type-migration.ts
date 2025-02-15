import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { commonFields } from "../common.fields";

const tableName = "admin.purchase-order-type";

export class PurchaseOrderTypeMigration1738990397677
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
            name: "code",
            type: "varchar",
            length: "160",
            isUnique: true,
            isNullable: false,
          },

          {
            name: "name_en",
            type: "varchar",
            length: "160",
            isUnique: true,
            isNullable: false,
          },

          {
            name: "name_kh",
            type: "varchar",
            isUnique: true,
            length: "160",
            isNullable: false,
          },
          {
            name: "default_pr_type_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "code_prefix",
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

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ["default_pr_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "admin.purchase-receipt-type",
        onDelete: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    await this.dropForeignKey(queryRunner, "default_pr_type_id");
    await this.dropForeignKey(queryRunner, "created_by");
  }

  private async dropForeignKey(queryRunner, name: string) {
    const table = await queryRunner.getTable(tableName);

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(name) !== -1
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);
  }
}
