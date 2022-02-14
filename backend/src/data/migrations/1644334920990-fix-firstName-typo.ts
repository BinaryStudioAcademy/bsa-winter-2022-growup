import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixFirstNameTypo1644334920990 implements MigrationInterface {
    name = 'fixFirstNameTypo1644334920990';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "firsName" TO "firstName"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "firstName" TO "firsName"');
    }

}
