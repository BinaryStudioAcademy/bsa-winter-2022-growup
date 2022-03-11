import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserSkillTable1645602355767 implements MigrationInterface {
    name = 'createUserSkillTable1645602355767';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('DROP INDEX "public"."IDX_03260daf2df95f4492cc8eb00e"');
        await queryRunner.query('DROP INDEX "public"."IDX_49db81d31fc330a905af3c0120"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "selfRating" integer');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "mentorRating" integer');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "reviewRating" integer');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "reviewRating"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "mentorRating"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "selfRating"');
        await queryRunner.query('CREATE INDEX "IDX_49db81d31fc330a905af3c0120" ON "user_skill" ("skillId") ');
        await queryRunner.query('CREATE INDEX "IDX_03260daf2df95f4492cc8eb00e" ON "user_skill" ("userId") ');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    }

}
