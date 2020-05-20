import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsToRole1589953502664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'type');
    await queryRunner.addColumns('roles', [
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isUnique: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'description');
    await queryRunner.dropColumn('roles', 'name');
    await queryRunner.dropColumn('roles', 'slug');
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    );
  }
}
