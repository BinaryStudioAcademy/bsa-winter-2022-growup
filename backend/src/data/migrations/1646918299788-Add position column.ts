import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionColumn1646918299788 implements MigrationInterface {
    name = 'AddPositionColumn1646918299788';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD "position" character varying(150)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "position"');
    }

}
