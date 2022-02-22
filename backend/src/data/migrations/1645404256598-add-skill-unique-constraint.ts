import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSkillUniqueConstraint1645404256598 implements MigrationInterface {
    name = 'addSkillUniqueConstraint1645404256598';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill" ADD CONSTRAINT "company_unique_skill" UNIQUE ("type", "name", "companyId")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill" DROP CONSTRAINT "company_unique_skill"');
    }

}
