import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCategory1645123036009 implements MigrationInterface {
    name = 'userCategory1645123036009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"');
        await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_8474ba862ee38b0b26beafd644"');
        await queryRunner.query('ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_8474ba862ee38b0b26beafd644" UNIQUE ("userId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc" UNIQUE ("quizCaregoryId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "avatar" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

}
