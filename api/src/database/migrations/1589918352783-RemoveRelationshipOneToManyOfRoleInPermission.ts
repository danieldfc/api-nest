import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class RemoveRelationshipOneToManyOfRoleInPermission1589918352783
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('permissions', 'PermissionsRole');
    await queryRunner.dropColumn('permissions', 'role_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'role_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'roles',
      new TableForeignKey({
        name: 'PermissionsRole',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
      }),
    );
  }
}
