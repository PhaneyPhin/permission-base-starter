import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { commonFields } from '../common.fields';

const tableName = 'admin.purchase-order';

export class PurchaseOrderMigration1740210464372 implements MigrationInterface {
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
            name: 'po_number',
            type: 'varchar',
            length: '160',
            isUnique: true,
            isNullable: false,
          },
          
          {
            name: 'po_type_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'branch_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'project_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'vendor_id',
            type: 'integer',
            isNullable: false,
          },
          
          {
            name: 'vendor_name',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'po_date',
            type: "timestamp with time zone",
            isNullable: false,
          },
          
          {
            name: 'promised_date',
            type: "timestamp with time zone",
            isNullable: false,
          },
          
          {
            name: 'document_ref',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'second_ref',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'po_ref',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'total_qty',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'open_qty',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'receipt_qty',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'net_amount',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'total_discount',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'total_amount',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          
          {
            name: 'currency_code',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          
          {
            name: 'priority',
            type: 'varchar',
            length: '160',
            isNullable: true,
          },
          
          {
            name: 'attachements',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          
          {
            name: 'description',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          
          {
            name: 'is_approved',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          
          {
            name: 'status',
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

    //Add the foreign key constraint
  //   await queryRunner.createForeignKey(
  //       tableName,
  //       new TableForeignKey({
  //           columnNames: ['created_by'],
  //           referencedColumnNames: ['id'],
  //           referencedTableName: 'admin.users',
  //           onDelete: 'SET NULL',
  //       }),
  //   );
  // }

  // public async down(queryRunner: QueryRunner): Promise<void> {
  //   const table = await queryRunner.getTable(tableName);

  //   const foreignKey = table.foreignKeys.find(
  //     (fk) => fk.columnNames.indexOf('created_by') !== -1,
  //   );
  //   await queryRunner.dropForeignKey(tableName, foreignKey);
  //   await queryRunner.dropTable(tableName, true);
  // }
    const foreignKeys = [
      { column: 'created_by', refTable: 'admin.users' },
      { column: 'updated_by', refTable: 'admin.users' },
      { column: 'po_type_id', refTable: 'admin.purchase-order-type' },
      { column: 'branch_id', refTable: 'admin.branch' },
      { column: 'project_id', refTable: 'admin.analysis-code' },
      { column: 'vendor_id', refTable: 'admin.vendor' },
    ];

    for (const fk of foreignKeys) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          columnNames: [fk.column],
          referencedColumnNames: ['id'],
          referencedTableName: fk.refTable,
          onDelete: 'SET NULL',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    if (table) {
      for (const fk of table.foreignKeys) {
        await queryRunner.dropForeignKey(tableName, fk);
      }
      await queryRunner.dropTable(tableName, true);
    }
  }
}
