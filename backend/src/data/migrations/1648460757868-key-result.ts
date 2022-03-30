import { MigrationInterface, QueryRunner } from 'typeorm';

export class keyResult1648460757868 implements MigrationInterface {
    name = 'keyResult1648460757868';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "key_result" ADD "result" integer NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "key_result" DROP COLUMN "result"');
    }

}
