import { MigrationInterface, QueryRunner } from 'typeorm';

export class avatartNullable1645172456913 implements MigrationInterface {
    name = 'avatartNullable1645172456913';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" DROP NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" SET NOT NULL');
    }

}
