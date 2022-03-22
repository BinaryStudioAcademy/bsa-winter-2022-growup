import { MigrationInterface, QueryRunner } from 'typeorm';

export class userPasswordNullable1647333562865 implements MigrationInterface {
  name = 'userPasswordNullable1647333562865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL',
    );
  }
}
