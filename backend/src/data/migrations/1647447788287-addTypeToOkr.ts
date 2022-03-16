import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTypeToOkr1647447788287 implements MigrationInterface {
    name = 'addTypeToOkr1647447788287';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "okr" ADD "type" character varying(50) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "type"');
    }
}
