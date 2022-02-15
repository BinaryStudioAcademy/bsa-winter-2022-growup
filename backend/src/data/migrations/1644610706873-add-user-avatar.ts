import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserAvatar1644610706873 implements MigrationInterface {
  name = 'addUserAvatar1644610706873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD COLUMN "avatar" character varying(100)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "avatar"');
  }
}
