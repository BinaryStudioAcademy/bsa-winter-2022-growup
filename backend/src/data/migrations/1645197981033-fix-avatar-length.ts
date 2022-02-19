import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAvatarLength1645197981033 implements MigrationInterface {
    name = 'fixAvatarLength1645197981033';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" TYPE varchar(150)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" TYPE varchar(100)');
    }
}
