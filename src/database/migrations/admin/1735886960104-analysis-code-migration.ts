import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.analysis-code';

export class AnalysisCodeMigration1735886960104 implements MigrationInterface {
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
            name: 'dimension_id',
            type: 'integer',
            isNullable: true,
          },
          
          {
            name: 'code',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'name_en',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'name_kh',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: true,
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

    // Add the foreign key constraint
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
          columnNames: ['updated_by'],
          referencedColumnNames: ['id'],
          referencedTableName: 'admin.users',
          onDelete: 'SET NULL',
      }),
  );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
          columnNames: ['dimension_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'admin.dimension',
          onDelete: 'SET NULL',
      }),
  );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('created_by') !== -1,
    );

    const dimensionForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('dimension_id') !== -1,
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);
    await queryRunner.dropForeignKey(tableName, dimensionForeignKey);
    await queryRunner.dropTable(tableName, true);
  }
}
