import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteCascadeOkr1648487329338 implements MigrationInterface {
    name = 'AddDeleteCascadeOkr1648487329338';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "objective" DROP CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608"');
        await queryRunner.query('ALTER TABLE "key_result" DROP CONSTRAINT "FK_23a93a8313c2eeb141e72c30098"');
        await queryRunner.query('ALTER TABLE "objective" ADD CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608" FOREIGN KEY ("okrId") REFERENCES "okr"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "key_result" ADD CONSTRAINT "FK_23a93a8313c2eeb141e72c30098" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "key_result" DROP CONSTRAINT "FK_23a93a8313c2eeb141e72c30098"');
        await queryRunner.query('ALTER TABLE "objective" DROP CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608"');
        await queryRunner.query('ALTER TABLE "key_result" ADD CONSTRAINT "FK_23a93a8313c2eeb141e72c30098" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "objective" ADD CONSTRAINT "FK_7a51d6bc7ecc5e0eceabadf6608" FOREIGN KEY ("okrId") REFERENCES "okr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
