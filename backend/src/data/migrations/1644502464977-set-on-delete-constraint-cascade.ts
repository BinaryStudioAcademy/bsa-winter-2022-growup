import { MigrationInterface, QueryRunner } from 'typeorm';

export class setOnDeleteConstraintCascade1644502464977
  implements MigrationInterface
{
  name = 'setOnDeleteConstraintCascade1644502464977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON ACTION ON UPDATE NO ACTION',
    );
  }
}
