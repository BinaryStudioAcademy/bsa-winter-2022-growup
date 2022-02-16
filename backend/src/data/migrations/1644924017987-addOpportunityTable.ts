import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOpportunityTable1644924017987 implements MigrationInterface {
    name = 'addOpportunityTable1644924017987';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "opportunity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(250) NOT NULL, "organization" character varying(250) NOT NULL, "startDate" character varying(250) NOT NULL, "type" character varying(250) NOT NULL, "userId" uuid, "companyId" uuid, CONSTRAINT "PK_085fd6d6f4765325e6c16163568" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "opportunity_tag" ("opportunityId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "REL_39122850ab509ba881f1f1d07d" UNIQUE ("opportunityId"), CONSTRAINT "REL_278b33721d72f04583a22163cf" UNIQUE ("tagsId"), CONSTRAINT "PK_0684b7f9975f521cc52aaac0122" PRIMARY KEY ("opportunityId", "tagsId"))');
        await queryRunner.query('ALTER TABLE "opportunity" ADD CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "opportunity" ADD CONSTRAINT "FK_5a104112b21bbebb37fca93a548" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "opportunity_tag" ADD CONSTRAINT "FK_39122850ab509ba881f1f1d07d4" FOREIGN KEY ("opportunityId") REFERENCES "opportunity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "opportunity_tag" ADD CONSTRAINT "FK_278b33721d72f04583a22163cfe" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "opportunity_tag" DROP CONSTRAINT "FK_278b33721d72f04583a22163cfe"');
        await queryRunner.query('ALTER TABLE "opportunity_tag" DROP CONSTRAINT "FK_39122850ab509ba881f1f1d07d4"');
        await queryRunner.query('ALTER TABLE "opportunity" DROP CONSTRAINT "FK_5a104112b21bbebb37fca93a548"');
        await queryRunner.query('ALTER TABLE "opportunity" DROP CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87"');
        await queryRunner.query('DROP TABLE "opportunity_tag"');
        await queryRunner.query('DROP TABLE "opportunity"');
    }

}
