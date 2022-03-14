import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionColumn1646918299788 implements MigrationInterface {
    name = 'AddPositionColumn1646918299788';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD "position" character varying(150)');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_8474ba862ee38b0b26beafd644"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_8474ba862ee38b0b26beafd644" UNIQUE ("userId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc" UNIQUE ("quizCaregoryId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "position"');
    }

}
