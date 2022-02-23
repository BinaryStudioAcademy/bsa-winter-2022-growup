import { MigrationInterface, QueryRunner } from 'typeorm';

export class tagsCitext1645559695761 implements MigrationInterface {
    name = 'tagsCitext1645559695761';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tags" ALTER COLUMN "name" TYPE CITEXT');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "tags" ALTER COLUMN "name" TYPE CITEXT');
    }
}
