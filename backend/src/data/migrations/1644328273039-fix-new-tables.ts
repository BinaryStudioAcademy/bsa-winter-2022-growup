import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixNewTables1644328273039 implements MigrationInterface {
  name = 'fixNewTables1644328273039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_skill" RENAME COLUMN "role" TO "name"',
    );
    await queryRunner.query(
      'CREATE TABLE "user_quiz_category" ("quizCaregoryId" uuid NOT NULL, "userId" uuid NOT NULL, "score" integer NOT NULL, CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc" UNIQUE ("quizCaregoryId"), CONSTRAINT "REL_8474ba862ee38b0b26beafd644" UNIQUE ("userId"), CONSTRAINT "PK_424684661ecb5ac71999932cfa6" PRIMARY KEY ("quizCaregoryId", "userId"))',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"',
    );
    await queryRunner.query('DROP TABLE "user_quiz_category"');
    await queryRunner.query(
      'ALTER TABLE "user_skill" RENAME COLUMN "name" TO "role"',
    );
  }
}
