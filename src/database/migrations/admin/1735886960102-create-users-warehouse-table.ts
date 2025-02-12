import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "admin.users_warehouses",
  usersTableName = "admin.users",
  warehouseTable = "admin.warehouse";
export class createUsersWarehouse1735886960102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "warehouse_id",
            type: "integer",
            isPrimary: true,
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: usersTableName,
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["warehouse_id"],
            referencedColumnNames: ["id"],
            referencedTableName: warehouseTable,
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //If table has foreingn keys, third parameter must to be true
    await queryRunner.dropTable(tableName, true, true);
  }
}
