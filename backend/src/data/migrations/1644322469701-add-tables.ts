import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTables1644322469701 implements MigrationInterface {
  name = 'addTables1644322469701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "career_journey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "startDate" TIMESTAMP NOT NULL, "endDate" date, "company" character varying(250) NOT NULL, "position" character varying(250) NOT NULL, "userId" uuid, CONSTRAINT "PK_2b84abc6af1f41c4dfcf7bc2d56" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "company" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "company" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "company" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "domain" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "domain" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "domain" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "user" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "career_parh" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "okr" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "okr" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "okr" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "skill" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "skill_category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "key_result" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "key_result" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "key_result" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "work_quiz" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "work_quiz" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "work_quiz" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "tags" ADD "deletedAt" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill" ADD "deletedAt" TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "endDate"');
    await queryRunner.query(
      'ALTER TABLE "okr" ADD "endDate" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "startDate"');
    await queryRunner.query(
      'ALTER TABLE "okr" ADD "startDate" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "career_journey" ADD CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "career_journey" DROP CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc"',
    );
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "startDate"');
    await queryRunner.query('ALTER TABLE "okr" ADD "startDate" date NOT NULL');
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "endDate"');
    await queryRunner.query('ALTER TABLE "okr" ADD "endDate" date NOT NULL');
    await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "tags" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "tags" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "tags" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" DROP COLUMN "createdAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" DROP COLUMN "createdAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" DROP COLUMN "createdAt"',
    );
    await queryRunner.query('ALTER TABLE "work_quiz" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "work_quiz" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "work_quiz" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "key_result" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "key_result" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "key_result" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "objective" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "objective" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "objective" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP COLUMN "createdAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" DROP COLUMN "createdAt"',
    );
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "okr" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "career_parh" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" DROP COLUMN "createdAt"',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP COLUMN "deletedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP COLUMN "createdAt"',
    );
    await queryRunner.query('ALTER TABLE "domain" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "domain" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "domain" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "company" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "company" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "company" DROP COLUMN "createdAt"');
    await queryRunner.query('DROP TABLE "career_journey"');
  }
}
