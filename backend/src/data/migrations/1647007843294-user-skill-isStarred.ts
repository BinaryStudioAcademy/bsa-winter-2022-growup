import { MigrationInterface, QueryRunner } from 'typeorm';

export class userSkillIsStarred1647007843294 implements MigrationInterface {
    name = 'userSkillIsStarred1647007843294';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD "isStarred" boolean NOT NULL DEFAULT false');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"');
        await queryRunner.query('ALTER TABLE "user_skill" DROP COLUMN "isStarred"');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
