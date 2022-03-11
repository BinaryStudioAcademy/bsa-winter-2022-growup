import { MigrationInterface, QueryRunner } from 'typeorm';

export class education1646859894186 implements MigrationInterface {
    name = 'education1646859894186';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "specialization" character varying(250) NOT NULL, "university" character varying(250) NOT NULL, "degree" character varying(250) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "education" ADD CONSTRAINT "FK_723e67bde13b73c5404305feb14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "education" DROP CONSTRAINT "FK_723e67bde13b73c5404305feb14"');
        await queryRunner.query('DROP TABLE "education"');
    }
}
