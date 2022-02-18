import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAvatarLength1645197981033 implements MigrationInterface {
    name = 'fixAvatarLength1645197981033';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "avatar"');
        await queryRunner.query('ALTER TABLE "user" ADD "avatar" character varying(150)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "avatar"');
        await queryRunner.query('ALTER TABLE "user" ADD "avatar" character varying(100)');
    }
}
