import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsrSkillCategToSkillCateg1648645503470 implements MigrationInterface {
    name = 'addUsrSkillCategToSkillCateg1648645503470';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef"');
        await queryRunner.query('ALTER TABLE "user_skill_category" RENAME COLUMN "skillLevelId" TO "skillCategoryId"');
        await queryRunner.query('ALTER TABLE "user_skill_category" RENAME CONSTRAINT "PK_ea46139dfdffe5ae0765c3efb1a" TO "PK_3d8c1bf85cc5bcfadfdc5188043"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_a749cdaadbfddd7fee47fbeb381" FOREIGN KEY ("skillCategoryId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_a749cdaadbfddd7fee47fbeb381"');
        await queryRunner.query('ALTER TABLE "user_skill_category" RENAME CONSTRAINT "PK_3d8c1bf85cc5bcfadfdc5188043" TO "PK_ea46139dfdffe5ae0765c3efb1a"');
        await queryRunner.query('ALTER TABLE "user_skill_category" RENAME COLUMN "skillCategoryId" TO "skillLevelId"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef" FOREIGN KEY ("skillLevelId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

}
