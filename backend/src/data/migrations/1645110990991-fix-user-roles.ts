import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixUserRoles1645110990991 implements MigrationInterface {
    name = 'fixUserRoles1645110990991';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TYPE "public"."user_role_role_enum" RENAME TO "user_role_role_enum_old"');
        await queryRunner.query('CREATE TYPE "public"."user_role_role_enum" AS ENUM(\'Admin\', \'Mentor\', \'Menteee\')');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" TYPE "public"."user_role_role_enum" USING "role"::"text"::"public"."user_role_role_enum"');
        await queryRunner.query('DROP TYPE "public"."user_role_role_enum_old"');
        await queryRunner.query('ALTER TYPE "public"."user_role_role_enum" RENAME TO "user_role_role_enum_old"');
        await queryRunner.query('CREATE TYPE "public"."user_role_role_enum" AS ENUM(\'Admin\', \'Mentor\', \'Menteee\')');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" TYPE "public"."user_role_role_enum" USING "role"::"text"::"public"."user_role_role_enum"');
        await queryRunner.query('DROP TYPE "public"."user_role_role_enum_old"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."user_role_role_enum_old" AS ENUM(\'Admin\', \'User\', \'Mentor\', \'Menteee\')');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" TYPE "public"."user_role_role_enum_old" USING "role"::"text"::"public"."user_role_role_enum_old"');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" SET DEFAULT \'User\'');
        await queryRunner.query('DROP TYPE "public"."user_role_role_enum"');
        await queryRunner.query('ALTER TYPE "public"."user_role_role_enum_old" RENAME TO "user_role_role_enum"');
        await queryRunner.query('CREATE TYPE "public"."user_role_role_enum_old" AS ENUM(\'Admin\', \'User\', \'Mentor\', \'Menteee\')');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" TYPE "public"."user_role_role_enum_old" USING "role"::"text"::"public"."user_role_role_enum_old"');
        await queryRunner.query('ALTER TABLE "user_role" ALTER COLUMN "role" SET DEFAULT \'User\'');
        await queryRunner.query('DROP TYPE "public"."user_role_role_enum"');
        await queryRunner.query('ALTER TYPE "public"."user_role_role_enum_old" RENAME TO "user_role_role_enum"');

    }

}
