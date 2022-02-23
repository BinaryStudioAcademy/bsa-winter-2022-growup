import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTagOpportunityTable1645021431295 implements MigrationInterface {
    name = 'addTagOpportunityTable1645021431295';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"');
        await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
        await queryRunner.query('CREATE TABLE "opportunity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(250) NOT NULL, "organization" character varying(250) NOT NULL, "startDate" character varying(250) NOT NULL, "type" character varying(250) NOT NULL, "userId" uuid, "companyId" uuid, CONSTRAINT "PK_085fd6d6f4765325e6c16163568" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "tag_opportunity" ("tagId" uuid NOT NULL, "opportunityId" uuid NOT NULL, CONSTRAINT "PK_e7ccf28d2982c15b01c34109b33" PRIMARY KEY ("tagId", "opportunityId"))');
        await queryRunner.query('CREATE INDEX "IDX_e0bfa67083bff0ebb2c0f8f873" ON "tag_opportunity" ("tagId") ');
        await queryRunner.query('CREATE INDEX "IDX_f90877967057bc8d110d0ae9e2" ON "tag_opportunity" ("opportunityId") ');
        await queryRunner.query('ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "opportunity" ADD CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "opportunity" ADD CONSTRAINT "FK_5a104112b21bbebb37fca93a548" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "tag_opportunity" ADD CONSTRAINT "FK_e0bfa67083bff0ebb2c0f8f8730" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "tag_opportunity" ADD CONSTRAINT "FK_f90877967057bc8d110d0ae9e28" FOREIGN KEY ("opportunityId") REFERENCES "opportunity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tag_opportunity" DROP CONSTRAINT "FK_f90877967057bc8d110d0ae9e28"');
        await queryRunner.query('ALTER TABLE "tag_opportunity" DROP CONSTRAINT "FK_e0bfa67083bff0ebb2c0f8f8730"');
        await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"');
        await queryRunner.query('ALTER TABLE "opportunity" DROP CONSTRAINT "FK_5a104112b21bbebb37fca93a548"');
        await queryRunner.query('ALTER TABLE "opportunity" DROP CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87"');
        await queryRunner.query('ALTER TABLE "tags" DROP CONSTRAINT "FK_40d3284c7c060f75caee62cf940"');
        await queryRunner.query('DROP INDEX "public"."IDX_f90877967057bc8d110d0ae9e2"');
        await queryRunner.query('DROP INDEX "public"."IDX_e0bfa67083bff0ebb2c0f8f873"');
        await queryRunner.query('DROP TABLE "tag_opportunity"');
        await queryRunner.query('DROP TABLE "opportunity"');
        await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "tags" ADD CONSTRAINT "FK_40d3284c7c060f75caee62cf940" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

}
