import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixPasswordLength1644334292295 implements MigrationInterface {
  name = 'fixPasswordLength1644334292295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ALTER COLUMN "password" TYPE varchar(100)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ALTER COLUMN "password" TYPE varchar(50)',
    );
  }
}
