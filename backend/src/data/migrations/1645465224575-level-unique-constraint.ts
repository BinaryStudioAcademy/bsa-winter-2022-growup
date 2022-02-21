import { MigrationInterface, QueryRunner } from 'typeorm';

export class levelUniqueConstraint1645465224575 implements MigrationInterface {
    name = 'levelUniqueConstraint1645465224575';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "domain_level" ADD CONSTRAINT "domain_unique_level" UNIQUE ("domainId", "name")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "domain_level" DROP CONSTRAINT "domain_unique_level"');
    }
}
