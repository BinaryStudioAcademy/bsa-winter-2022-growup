import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSkillLevelDeleteCascade1647522582581 implements MigrationInterface {
    name = 'addSkillLevelDeleteCascade1647522582581';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill_category" DROP CONSTRAINT "FK_49411beb8cf5a966124b74df8e2"');
        await queryRunner.query('ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"');
        await queryRunner.query('ALTER TABLE "skill_category" ADD CONSTRAINT "FK_49411beb8cf5a966124b74df8e2" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"');
        await queryRunner.query('ALTER TABLE "skill_category" DROP CONSTRAINT "FK_49411beb8cf5a966124b74df8e2"');
        await queryRunner.query('ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "skill_category" ADD CONSTRAINT "FK_49411beb8cf5a966124b74df8e2" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
