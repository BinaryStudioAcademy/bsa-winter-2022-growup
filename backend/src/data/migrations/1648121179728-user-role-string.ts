import { MigrationInterface, QueryRunner } from 'typeorm';

import { RoleType } from '~/common/enums/role-type';
import { asyncForEach } from '~/common/helpers/array.helper';

interface IUserRole {
  userId: string;
  role: RoleType;
}

export class userRoleString1648121179728 implements MigrationInterface {
  name = 'userRoleString1648121179728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    await queryRunner.query(
      'CREATE TYPE "public"."user_role_enum" AS ENUM(\'Mentor\', \'Mentee\', \'Admin\')',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL',
    );

    const roles: IUserRole[] = await queryRunner.query(
      'SELECT * FROM "user_role"',
    );

    asyncForEach(async (role) => {
      await queryRunner.query(
        `UPDATE "user" SET role = '${role.role}' WHERE id = '${role.userId}'`,
      );
    }, roles);

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "role"');
    await queryRunner.query('DROP TYPE "public"."user_role_enum"');
  }
}
