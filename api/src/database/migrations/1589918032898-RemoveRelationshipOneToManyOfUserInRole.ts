import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class RemoveRelationshipOneToManyOfUserInRole1589918032898
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('roles', 'RoleUser');
    await queryRunner.dropColumn('roles', 'user_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'roles',
      new TableForeignKey({
        name: 'RoleUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }
}
