import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixSkillObjectiveTypo1645006137823 implements MigrationInterface {
  name = 'fixSkillObjectiveTypo1645006137823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_ec6a30868915c82c383044d9c95"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" RENAME COLUMN "categotyId" TO "categoryId"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" RENAME COLUMN "categoryId" TO "categotyId"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_ec6a30868915c82c383044d9c95" FOREIGN KEY ("categotyId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
