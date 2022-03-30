import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixUserLevelName1648557845095 implements MigrationInterface {
    name = 'fixUserLevelName1648557845095';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_31372126642a18acf9110981319"');
        await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "domainId" TO "levelId"');
        await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "FK_50cb127cc28cf5075eda2fbaa85" FOREIGN KEY ("levelId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_50cb127cc28cf5075eda2fbaa85"');
        await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "levelId" TO "domainId"');
        await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "FK_31372126642a18acf9110981319" FOREIGN KEY ("domainId") REFERENCES "domain_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
