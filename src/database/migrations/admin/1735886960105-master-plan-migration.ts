import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.master-plan';

export class MasterPlanMigration1735886960105 implements MigrationInterface {
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
            name: 'unit_code',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'project',
            type: 'integer'
          },
          
          {
            name: 'block',
            type: 'integer'
          },
          
          {
            name: 'building',
            type: 'integer',
          },
          
          {
            name: 'street',
            type: 'integer',
          },
          
          {
            name: 'unit_number',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'division',
            type: 'integer'
          },
          
          {
            name: 'unit_type',
            type: 'integer'
          },
          
          {
            name: 'land_size',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'unit_size',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'description',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'boq',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'start_build_date',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'end_build_date',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'actual_finish_date',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'completed_percentage',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'duration',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'standard_cost',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'actual_cost',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'unearn_account',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'note',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'is_handover',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },    
          {
            name: 'updated_by',
            type: 'uuid',
            isNullable: true,
          },
          
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: true,
            default: true,
          },
          {
            name: 'attachments',
            type: 'jsonb',
            isNullable: true
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

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
          columnNames: ['updated_by'],
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

    const updatedBtForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('updated_by') !== -1,
    );
    await queryRunner.dropForeignKey(tableName, foreignKey);
    await queryRunner.dropForeignKey(tableName, updatedBtForeignKey);

    await queryRunner.dropTable(tableName, true);
  }
}
