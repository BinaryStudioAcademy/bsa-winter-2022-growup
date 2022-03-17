import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSkillLevelDeleteCascade1647522582581 implements MigrationInterface {
    name = 'addSkillLevelDeleteCascade1647522582581';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "skill_category" DROP CONSTRAINT "FK_49411beb8cf5a966124b74df8e2"');
        await queryRunner.query('ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_8474ba862ee38b0b26beafd644"');
        await queryRunner.query('ALTER TABLE "skill_category" ADD CONSTRAINT "FK_49411beb8cf5a966124b74df8e2" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"');
        await queryRunner.query('ALTER TABLE "skill_category" DROP CONSTRAINT "FK_49411beb8cf5a966124b74df8e2"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_8474ba862ee38b0b26beafd644" UNIQUE ("userId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc" UNIQUE ("quizCaregoryId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "skill_category" ADD CONSTRAINT "FK_49411beb8cf5a966124b74df8e2" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
