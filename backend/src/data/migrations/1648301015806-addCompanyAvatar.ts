import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyAvatar1648301015806 implements MigrationInterface {
    name = 'addCompanyAvatar1648301015806';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "company" ADD "avatar" character varying(150)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "company" DROP COLUMN "avatar"');
    }
}
