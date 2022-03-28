import { MigrationInterface, QueryRunner } from 'typeorm';

export class okrStatus1648233537534 implements MigrationInterface {
    name = 'okrStatus1648233537534';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."okr_status_enum" AS ENUM(\'open\', \'close\')');
        await queryRunner.query('ALTER TABLE "okr" ADD "status" "public"."okr_status_enum" NOT NULL DEFAULT \'open\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "status"');
        await queryRunner.query('DROP TYPE "public"."okr_status_enum"');
    }

}
