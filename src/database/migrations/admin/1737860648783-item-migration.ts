import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.item';

export class ItemMigration1737860648783 implements MigrationInterface {
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
            name: 'code',
            type: 'varchar',
            length: '160',
            isUnique: true,
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
            name: 'item_group_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'uom_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'valuation_method_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'item_type',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'min_stock',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'standard_cost',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'unit_cost',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'item_image',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'note',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('created_by') !== -1,
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);
    await queryRunner.dropTable(tableName, true);
  }
}
