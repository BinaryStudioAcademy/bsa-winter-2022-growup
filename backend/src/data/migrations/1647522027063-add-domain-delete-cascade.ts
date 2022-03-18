import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDomainDeleteCascade1647522027063 implements MigrationInterface {
    name = 'addDomainDeleteCascade1647522027063';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "domain_level" DROP CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a"');
        await queryRunner.query('ALTER TABLE "domain_level" ADD CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "domain_level" DROP CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a"');
        await queryRunner.query('ALTER TABLE "domain_level" ADD CONSTRAINT "FK_0154d2f194229bfb0f5f3a2348a" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
