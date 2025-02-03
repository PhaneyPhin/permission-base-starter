import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.staff-profile';

export class StaffProfileMigration1737647556021 implements MigrationInterface {
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
            name: 'staff_code',
            type: 'varchar',
            length: '160',
            isNullable: false,
            isUnique: true,
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
            name: 'sex',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'title',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'date_of_birth',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          
          {
            name: 'marital_status',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'nationality',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'religion',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'company_card_no',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'identity_id',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'phone1',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'phone2',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'working_email',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'personal_email',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'place_of_birth',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          
          {
            name: 'branch_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'department_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'position_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'hired_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          
          {
            name: 'permanent_address',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          
          {
            name: 'curren_address',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'profile_image',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'signature_image',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '160',
            isNullable: false,
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
