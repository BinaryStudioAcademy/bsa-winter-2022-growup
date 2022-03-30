import { MigrationInterface, QueryRunner } from 'typeorm';

export class keyResult1648645069010 implements MigrationInterface {
    name = 'keyResult1648645069010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "key_result" ADD "result" integer NOT NULL DEFAULT \'0\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "key_result" DROP COLUMN "result"');
    }

}
