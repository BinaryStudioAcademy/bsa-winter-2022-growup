import { MigrationInterface, QueryRunner } from 'typeorm';

export class registrationTokenUser1647333255816 implements MigrationInterface {
  name = 'registrationTokenUser1647333255816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "registration_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "value" uuid NOT NULL, CONSTRAINT "UQ_d04776f6eabee2b543b705d08d3" UNIQUE ("value"), CONSTRAINT "PK_d0d7c9476ab66807ae55f86200b" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "registration_token"');
  }
}
