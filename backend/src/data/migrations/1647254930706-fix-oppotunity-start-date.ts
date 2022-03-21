import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixOppotunityStartDate1647254930706 implements MigrationInterface {
  name = 'fixOppotunityStartDate1647254930706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "opportunity" DROP COLUMN "startDate"',
    );
    await queryRunner.query(
      'ALTER TABLE "opportunity" ADD "startDate" date NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "opportunity" DROP COLUMN "startDate"',
    );
    await queryRunner.query(
      'ALTER TABLE "opportunity" ADD "startDate" character varying(250) NOT NULL',
    );
  }
}
