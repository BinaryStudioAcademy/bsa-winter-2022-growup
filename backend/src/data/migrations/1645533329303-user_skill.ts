import { MigrationInterface, QueryRunner } from 'typeorm';

export class userSkill1645533329303 implements MigrationInterface {
    name = 'userSkill1645533329303';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "PK_42557e0ad33b670a55b7bd0f725"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "id"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "createdAt"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "updatedAt"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "deletedAt"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "skillId" uuid NOT NULL');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "PK_49db81d31fc330a905af3c01205" PRIMARY KEY ("skillId")');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "PK_49db81d31fc330a905af3c01205"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "PK_ad35af7f2b556d0b9a67af8db8b" PRIMARY KEY ("userId", "skillId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "REL_8474ba862ee38b0b26beafd644"');
        await queryRunner.query('ALTER TABLE "user_skill" ALTER COLUMN "userId" SET NOT NULL');
        await queryRunner.query('CREATE INDEX "IDX_03260daf2df95f4492cc8eb00e" ON "user_skill" ("userId") ');
        await queryRunner.query('CREATE INDEX "IDX_49db81d31fc330a905af3c0120" ON "user_skill" ("skillId") ');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"');
        await queryRunner.query('ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7"');
        await queryRunner.query('DROP INDEX "public"."IDX_49db81d31fc330a905af3c0120"');
        await queryRunner.query('DROP INDEX "public"."IDX_03260daf2df95f4492cc8eb00e"');
        await queryRunner.query('ALTER TABLE "user_skill" ALTER COLUMN "userId" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_8474ba862ee38b0b26beafd644" UNIQUE ("userId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "REL_c3f3239a6c089bad8ca83b9acc" UNIQUE ("quizCaregoryId")');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_c3f3239a6c089bad8ca83b9acc7" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "PK_ad35af7f2b556d0b9a67af8db8b"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "PK_49db81d31fc330a905af3c01205" PRIMARY KEY ("skillId")');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "PK_49db81d31fc330a905af3c01205"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "skillId"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "name" character varying(50) NOT NULL');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "deletedAt" TIMESTAMP');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "PK_42557e0ad33b670a55b7bd0f725" PRIMARY KEY ("id")');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
