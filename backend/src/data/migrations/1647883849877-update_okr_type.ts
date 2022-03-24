import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateOkrType1647883849877 implements MigrationInterface {
    name = 'updateOkrType1647883849877';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "type"');
        await queryRunner.query('CREATE TYPE "public"."okr_type_enum" AS ENUM(\'my_okr\', \'team_okr\')');
        await queryRunner.query('ALTER TABLE "okr" ADD "type" "public"."okr_type_enum" NOT NULL DEFAULT \'my_okr\'');
        await queryRunner.query('ALTER TABLE "registration_token" ADD CONSTRAINT "FK_15840a36225195afa758c7a407b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "registration_token" DROP CONSTRAINT "FK_15840a36225195afa758c7a407b"');
        await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "type"');
        await queryRunner.query('DROP TYPE "public"."okr_type_enum"');
        await queryRunner.query('ALTER TABLE "okr" ADD "type" character varying(50) NOT NULL');
    }
}
