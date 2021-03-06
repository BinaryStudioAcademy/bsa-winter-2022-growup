import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTables1644326582895 implements MigrationInterface {
  name = 'addTables1644326582895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "domain" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "companyId" uuid, CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "domain_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "nextLevelId" uuid, "prevLevelId" uuid, "domainId" uuid, CONSTRAINT "PK_01dd57c69c28fe1a002c216889e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "firsName" character varying(250), "lastName" character varying(250), "companyId" uuid, "mentorId" uuid, "domainId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "career_journey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP, "company" character varying(250) NOT NULL, "position" character varying(250) NOT NULL, "userId" uuid, CONSTRAINT "PK_2b84abc6af1f41c4dfcf7bc2d56" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "career_parh" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "domainId" uuid, "nextDomainId" uuid, CONSTRAINT "PK_eb816deb8c013dd098cc42cc31e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "okr" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "endDate" TIMESTAMP NOT NULL, "startDate" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_0c6f7e4659027c277d2384b5d38" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TYPE "public"."skill_name_enum" AS ENUM(\'Admin\', \'Write\', \'Read\')',
    );
    await queryRunner.query(
      'CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "public"."skill_name_enum" NOT NULL DEFAULT \'Read\', "type" character varying(250) NOT NULL, "companyId" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "skill_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "skillId" uuid, "levelId" uuid, CONSTRAINT "PK_3cb82aab7c71a84b8176f25bbe0" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "skill_objective" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "categotyId" uuid, CONSTRAINT "PK_8189d537985f6ca322414d0e90a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "objective" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50), "result" integer NOT NULL, "okrId" uuid, "skillObjectiveId" uuid, CONSTRAINT "PK_1084365b2a588160b31361a252e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "key_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(250) NOT NULL, "objectiveId" uuid, CONSTRAINT "PK_9064c5abe9ba68432934564d43f" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "companyId" uuid, CONSTRAINT "PK_3c0c5136345c175dff2945b51b2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "quiz_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "quizId" uuid, CONSTRAINT "PK_ac89194b30919dc6d8cab497ac8" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "quiz_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "question" character varying(250) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_0bab74c2a71b9b3f8a941104083" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "quiz_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "answer" character varying(250) NOT NULL, "score" integer NOT NULL, "questionId" uuid, CONSTRAINT "PK_926d49bc4559c8200b6c6c2c22f" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "refresh_token" ("token" character varying(255) NOT NULL, "userId" uuid, CONSTRAINT "PK_c31d0a2f38e6e99110df62ab0af" PRIMARY KEY ("token"))',
    );
    await queryRunner.query(
      'CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(250) NOT NULL, "companyId" uuid, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_quize_category" ("quizCaregoryId" uuid NOT NULL, "userId" uuid NOT NULL, "score" integer NOT NULL, CONSTRAINT "REL_90e0bcfca648794861d8e613cb" UNIQUE ("quizCaregoryId"), CONSTRAINT "REL_7614d8bcc3f23045bca6367031" UNIQUE ("userId"), CONSTRAINT "PK_5d1d4385315bc5eec35311bd8ea" PRIMARY KEY ("quizCaregoryId", "userId"))',
    );
    await queryRunner.query(
      'CREATE TYPE "public"."user_role_role_enum" AS ENUM(\'Admin\', \'User\')',
    );
    await queryRunner.query(
      'CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "public"."user_role_role_enum" NOT NULL DEFAULT \'User\', "userId" uuid, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_skill_category" ("userId" uuid NOT NULL, "skillLevelId" uuid NOT NULL, "isApproved" boolean NOT NULL, CONSTRAINT "REL_5c7b1c2323861c45a3b4f92a44" UNIQUE ("userId"), CONSTRAINT "REL_b19c06a1b041c4b5f99423063e" UNIQUE ("skillLevelId"), CONSTRAINT "PK_ea46139dfdffe5ae0765c3efb1a" PRIMARY KEY ("userId", "skillLevelId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" character varying(50) NOT NULL, "userId" uuid, CONSTRAINT "PK_42557e0ad33b670a55b7bd0f725" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "domain" ADD CONSTRAINT "FK_930c863c655f537b6c25295d1e7" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD CONSTRAINT "FK_b2f1cc191ca41416f90c8c92cad" FOREIGN KEY ("nextLevelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD CONSTRAINT "FK_28d0c70099d3084b018b205396a" FOREIGN KEY ("prevLevelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_312670d07e7e764737ef1973e66" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_31372126642a18acf9110981319" FOREIGN KEY ("domainId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "career_journey" ADD CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" ADD CONSTRAINT "FK_be50e43c8f50f53257d11751505" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" ADD CONSTRAINT "FK_52b6f7dc6ab8c400fd243d80877" FOREIGN KEY ("nextDomainId") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "okr" ADD CONSTRAINT "FK_f445a84605e6864ba6c7926a095" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD CONSTRAINT "FK_44ba0cd1691bf820e3d69f7370d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" ADD CONSTRAINT "FK_52493f890ccf0dabb4aa64fa725" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" ADD CONSTRAINT "FK_49411beb8cf5a966124b74df8e2" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_ec6a30868915c82c383044d9c95" FOREIGN KEY ("categotyId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" ADD CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608" FOREIGN KEY ("okrId") REFERENCES "okr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" ADD CONSTRAINT "FK_2498febe093357a15451f875293" FOREIGN KEY ("skillObjectiveId") REFERENCES "skill_objective"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "key_result" ADD CONSTRAINT "FK_23a93a8313c2eeb141e72c30098" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_quiz" ADD CONSTRAINT "FK_cf36b28fc7026f8e8dad4f8fa7d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" ADD CONSTRAINT "FK_8ff9d7f6f223329a1a2325c35af" FOREIGN KEY ("quizId") REFERENCES "work_quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_e6743051e3f62bfec41fa576b6b" FOREIGN KEY ("categoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" ADD CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57" FOREIGN KEY ("questionId") REFERENCES "quiz_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quize_category" ADD CONSTRAINT "FK_90e0bcfca648794861d8e613cbf" FOREIGN KEY ("quizCaregoryId") REFERENCES "quiz_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quize_category" ADD CONSTRAINT "FK_7614d8bcc3f23045bca63670319" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef" FOREIGN KEY ("skillLevelId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quize_category" DROP CONSTRAINT "FK_7614d8bcc3f23045bca63670319"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_quize_category" DROP CONSTRAINT "FK_90e0bcfca648794861d8e613cbf"',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_answer" DROP CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_e6743051e3f62bfec41fa576b6b"',
    );
    await queryRunner.query(
      'ALTER TABLE "quiz_category" DROP CONSTRAINT "FK_8ff9d7f6f223329a1a2325c35af"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_quiz" DROP CONSTRAINT "FK_cf36b28fc7026f8e8dad4f8fa7d"',
    );
    await queryRunner.query(
      'ALTER TABLE "key_result" DROP CONSTRAINT "FK_23a93a8313c2eeb141e72c30098"',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" DROP CONSTRAINT "FK_2498febe093357a15451f875293"',
    );
    await queryRunner.query(
      'ALTER TABLE "objective" DROP CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_ec6a30868915c82c383044d9c95"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" DROP CONSTRAINT "FK_49411beb8cf5a966124b74df8e2"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_category" DROP CONSTRAINT "FK_52493f890ccf0dabb4aa64fa725"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" DROP CONSTRAINT "FK_44ba0cd1691bf820e3d69f7370d"',
    );
    await queryRunner.query(
      'ALTER TABLE "okr" DROP CONSTRAINT "FK_f445a84605e6864ba6c7926a095"',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" DROP CONSTRAINT "FK_52b6f7dc6ab8c400fd243d80877"',
    );
    await queryRunner.query(
      'ALTER TABLE "career_parh" DROP CONSTRAINT "FK_be50e43c8f50f53257d11751505"',
    );
    await queryRunner.query(
      'ALTER TABLE "career_journey" DROP CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc"',
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "FK_31372126642a18acf9110981319"',
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "FK_312670d07e7e764737ef1973e66"',
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP CONSTRAINT "FK_28d0c70099d3084b018b205396a"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP CONSTRAINT "FK_b2f1cc191ca41416f90c8c92cad"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain" DROP CONSTRAINT "FK_930c863c655f537b6c25295d1e7"',
    );
    await queryRunner.query('DROP TABLE "user_skill"');
    await queryRunner.query('DROP TABLE "user_skill_category"');
    await queryRunner.query('DROP TABLE "user_role"');
    await queryRunner.query('DROP TYPE "public"."user_role_role_enum"');
    await queryRunner.query('DROP TABLE "user_quize_category"');
    await queryRunner.query('DROP TABLE "tags"');
    await queryRunner.query('DROP TABLE "refresh_token"');
    await queryRunner.query('DROP TABLE "quiz_answer"');
    await queryRunner.query('DROP TABLE "quiz_question"');
    await queryRunner.query('DROP TABLE "quiz_category"');
    await queryRunner.query('DROP TABLE "work_quiz"');
    await queryRunner.query('DROP TABLE "key_result"');
    await queryRunner.query('DROP TABLE "objective"');
    await queryRunner.query('DROP TABLE "skill_objective"');
    await queryRunner.query('DROP TABLE "skill_category"');
    await queryRunner.query('DROP TABLE "skill"');
    await queryRunner.query('DROP TYPE "public"."skill_name_enum"');
    await queryRunner.query('DROP TABLE "okr"');
    await queryRunner.query('DROP TABLE "career_parh"');
    await queryRunner.query('DROP TABLE "career_journey"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "domain_level"');
    await queryRunner.query('DROP TABLE "domain"');
    await queryRunner.query('DROP TABLE "company"');
  }
}
