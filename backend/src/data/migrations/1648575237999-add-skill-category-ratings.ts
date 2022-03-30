import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSkillCategoryRatings1648575237999 implements MigrationInterface {
    name = 'addSkillCategoryRatings1648575237999';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP COLUMN "isApproved"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD "isStarred" boolean NOT NULL DEFAULT false');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD "selfRating" integer');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD "mentorRating" integer');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD "reviewRating" integer');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP COLUMN "reviewRating"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP COLUMN "mentorRating"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP COLUMN "selfRating"');
        await queryRunner.query('ALTER TABLE "user_skill_category" DROP COLUMN "isStarred"');
        await queryRunner.query('ALTER TABLE "user_skill_category" ADD "isApproved" boolean NOT NULL');
    }

}
