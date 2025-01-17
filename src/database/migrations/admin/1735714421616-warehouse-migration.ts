import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.warehouse';

export class WarehouseMigration1735714421616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'branch_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'name_en',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'name_kh',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'description',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          ...commonFields,
        ],
      }),
      true,
    );

    // Add the foreign key constraint
    await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          columnNames: ['created_by'],
          referencedColumnNames: ['id'],
          referencedTableName: 'admin.users',
          onDelete: 'SET NULL',
        }),
      );

      // await queryRunner.createForeignKey(
      //   tableName,
      //   new TableForeignKey({
      //     columnNames: ['branch_id'],
      //     referencedColumnNames: ['id'],
      //     referencedTableName: 'admin.branch',
      //     onDelete: 'SET NULL',
      //   }),
      // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('created_by') !== -1,
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);

    // Remove the created_by column
    await queryRunner.dropTable(tableName);
  }
}
