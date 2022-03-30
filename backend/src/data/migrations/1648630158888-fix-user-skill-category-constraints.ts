import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixUserSkillCategoryConstraints1648630158888 implements MigrationInterface {
    name = 'fixUserSkillCategoryConstraints1648630158888';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "REL_5c7b1c2323861c45a3b4f92a44"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "REL_b19c06a1b041c4b5f99423063e"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef" FOREIGN KEY ("skillLevelId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "REL_b19c06a1b041c4b5f99423063e" UNIQUE ("skillLevelId")');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "REL_5c7b1c2323861c45a3b4f92a44" UNIQUE ("userId")');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_b19c06a1b041c4b5f99423063ef" FOREIGN KEY ("skillLevelId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
