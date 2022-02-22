import { MigrationInterface, QueryRunner } from 'typeorm';

export class fix1645087788030 implements MigrationInterface {
  name = 'fix1645087788030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP CONSTRAINT "FK_b2f1cc191ca41416f90c8c92cad"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"',
    );
    await queryRunner.query(
      'CREATE TABLE "domain_level_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_26d8dbfc97cd6402b1869d9b9ad" PRIMARY KEY ("id_ancestor", "id_descendant"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_08cc106584fb3122d3b61f64da" ON "domain_level_closure" ("id_ancestor") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_748dd4a15cc74f2862964822c6" ON "domain_level_closure" ("id_descendant") ',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" DROP COLUMN "nextLevelId"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level_closure" ADD CONSTRAINT "FK_08cc106584fb3122d3b61f64da4" FOREIGN KEY ("id_ancestor") REFERENCES "domain_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level_closure" ADD CONSTRAINT "FK_748dd4a15cc74f2862964822c68" FOREIGN KEY ("id_descendant") REFERENCES "domain_level"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "domain_level_closure" DROP CONSTRAINT "FK_748dd4a15cc74f2862964822c68"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level_closure" DROP CONSTRAINT "FK_08cc106584fb3122d3b61f64da4"',
    );
    await queryRunner.query(
      'ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" DROP CONSTRAINT "FK_89db07845749079cf3c2eafa59f"',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD "nextLevelId" uuid',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_748dd4a15cc74f2862964822c6"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_08cc106584fb3122d3b61f64da"',
    );
    await queryRunner.query('DROP TABLE "domain_level_closure"');
    await queryRunner.query(
      'ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill_objective" ADD CONSTRAINT "FK_89db07845749079cf3c2eafa59f" FOREIGN KEY ("categoryId") REFERENCES "skill_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD CONSTRAINT "FK_b2f1cc191ca41416f90c8c92cad" FOREIGN KEY ("nextLevelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
