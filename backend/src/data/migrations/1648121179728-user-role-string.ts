import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRoleString1648121179728 implements MigrationInterface {
    name = 'userRoleString1648121179728';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."user_role_enum" AS ENUM(\'Mentor\', \'Mentee\', \'Admin\')');
        await queryRunner.query('ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "role"');
        await queryRunner.query('DROP TYPE "public"."user_role_enum"');
    }

}
