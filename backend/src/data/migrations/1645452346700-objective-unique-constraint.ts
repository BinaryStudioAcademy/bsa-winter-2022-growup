import { MigrationInterface, QueryRunner } from 'typeorm';

export class objectiveUniqueConstraint1645452346700 implements MigrationInterface {
    name = 'objectiveUniqueConstraint1645452346700';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill_objective" ADD CONSTRAINT "skill_unique_objective" UNIQUE ("name", "categoryId")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill_objective" DROP CONSTRAINT "skill_unique_objective"');
    }

}
