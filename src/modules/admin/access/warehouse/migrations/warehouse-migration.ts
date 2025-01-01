import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.warehouse';

export class WarehouseMigration-timestamp implements MigrationInterface {
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
            name: 'branch',
            type: 'varchar',
            length: 160,
            isNullable: false,
          },
          
          {
            name: 'name_en',
            type: 'varchar',
            length: 160,
            isNullable: false,
          },
          
          {
            name: 'name_kh',
            type: 'varchar',
            length: 160,
            isNullable: false,
          },
          
          {
            name: 'description',
            type: 'varchar',
            length: 160,
            isNullable: false,
          },
          
          {
            name: 'created_by',
            type: 'varchar',
            length: 160,
            isNullable: false,
          },
          
          {
            name: 'contact_phone',
            type: 'varchar',
            length: 160,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true);
  }
}
