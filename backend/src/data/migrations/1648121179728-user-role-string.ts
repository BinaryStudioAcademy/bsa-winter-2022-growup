import { MigrationInterface, QueryRunner } from 'typeorm';

import { RoleType } from '~/common/enums/role-type';
import { asyncForEach } from '~/common/helpers/array.helper';

interface IUserRole {
  userId: string;
  role: RoleType;
}

interface IUser {
  id: string;
  role: RoleType;
}

export class userRoleString1648121179728 implements MigrationInterface {
  name = 'userRoleString1648121179728';

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('CREATE TYPE "public"."user_role_enum" AS ENUM(\'Mentor\', \'Mentee\', \'Admin\')');
    await queryRunner.query('ALTER TABLE "user" ADD "role" "public"."user_role_enum"');

    const roles: IUserRole[] = await queryRunner.query('SELECT * FROM "user_role"');

    await asyncForEach(async (role) => {
      await queryRunner.query(`UPDATE "user" SET role = '${role.role}' WHERE id = '${role.userId}'`);
    }, roles);

    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL');

    await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
    await queryRunner.query('DROP TABLE "user_role"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "public"."user_role_role_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');

    const users: IUser[] = await queryRunner.query('SELECT * FROM "user"');

    await asyncForEach(async (user) => {
      await queryRunner.query(`INSERT INTO "user_role" ("role", "userId") VALUES ('${user.role}', '${user.id}')`);
    }, users);

    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "role"');
    await queryRunner.query('DROP TYPE "public"."user_role_enum"');
  }
}
