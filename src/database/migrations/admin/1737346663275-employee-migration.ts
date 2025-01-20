import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.employee';

export class EmployeeMigration1737346663275 implements MigrationInterface {
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
            name: 'employee_code',
            type: 'varchar',
            length: '160',
            isUnique: true,
            isNullable: false,
          },
          
          {
            name: 'first_name',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'last_name',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'gender',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'date_of_birth',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          
          {
            name: 'contact_number',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'email_address',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'department_id',
            type: 'integer',
            isNullable: true,
          },
          
          {
            name: 'position_id',
            type: 'integer',
            isNullable: true,
          },
          
          {
            name: 'hire_date',
            type: 'timestamp with time zone',
            isNullable: true
          },
          
          {
            name: 'remark',
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
