import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryUniqueConstraint1645464931594 implements MigrationInterface {
    name = 'categoryUniqueConstraint1645464931594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_category" ADD CONSTRAINT "skill_unique_category" UNIQUE ("skillId", "levelId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_category" DROP CONSTRAINT "skill_unique_category"`);
    }
}
