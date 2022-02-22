import { MigrationInterface, QueryRunner } from 'typeorm';

export class skillFieldsUpdate1644929911066 implements MigrationInterface {
  name = 'skillFieldsUpdate1644929911066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."skill_name_enum" CASCADE');
    await queryRunner.query(
      'CREATE TYPE "public"."skill_type_enum" AS ENUM(\'Soft skills\', \'Hard skills\', \'Language\')',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "type" "public"."skill_type_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "name" character varying(250) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "name"');
    await queryRunner.query(
      'CREATE TYPE "public"."skill_name_enum" AS ENUM(\'Admin\', \'Write\', \'Read\')',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "name" "public"."skill_name_enum" NOT NULL DEFAULT \'Read\'',
    );
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."skill_type_enum" CASCADE');
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "type" character varying(250) NOT NULL',
    );
  }
}
