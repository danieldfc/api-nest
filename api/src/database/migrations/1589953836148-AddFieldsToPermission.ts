import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsToPermission1589953836148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('permissions', [
      new TableColumn({
        name: 'slug',
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
    await queryRunner.dropColumn('permissions', 'description');
    await queryRunner.dropColumn('permissions', 'slug');
  }
}
