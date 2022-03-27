import { MigrationInterface, QueryRunner } from 'typeorm';

export class registrationTokenJoinFix1647345078206
  implements MigrationInterface
{
  name = 'registrationTokenJoinFix1647345078206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "registration_token" ADD "userId" uuid',
    );
    await queryRunner.query(
      'ALTER TABLE "registration_token" ADD CONSTRAINT "UQ_15840a36225195afa758c7a407b" UNIQUE ("userId")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "registration_token" DROP CONSTRAINT "UQ_15840a36225195afa758c7a407b"',
    );
    await queryRunner.query(
      'ALTER TABLE "registration_token" DROP COLUMN "userId"',
    );
  }
}
