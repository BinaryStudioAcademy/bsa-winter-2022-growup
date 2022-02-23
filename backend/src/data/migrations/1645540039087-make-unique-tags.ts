import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeUniqueTags1645540039087 implements MigrationInterface {
    name = 'makeUniqueTags1645540039087';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tags" ADD CONSTRAINT "company_unique_tags" UNIQUE ("name", "companyId")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tags" DROP CONSTRAINT "company_unique_tags"');
    }
}
