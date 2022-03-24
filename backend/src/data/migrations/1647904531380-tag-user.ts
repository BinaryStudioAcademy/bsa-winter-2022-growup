import { MigrationInterface, QueryRunner } from 'typeorm';

export class tagUser1647904531380 implements MigrationInterface {
    name = 'tagUser1647904531380';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "tag_user" ("tagId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8d89574b11150c846973a4704a3" PRIMARY KEY ("tagId", "userId"))');
        await queryRunner.query('CREATE INDEX "IDX_e64a306f3215dbb99bbb26ca59" ON "tag_user" ("tagId") ');
        await queryRunner.query('CREATE INDEX "IDX_6a58ed56a12604c076a8e0cfda" ON "tag_user" ("userId") ');
        await queryRunner.query('ALTER TABLE "tag_user" ADD CONSTRAINT "FK_e64a306f3215dbb99bbb26ca599" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "tag_user" ADD CONSTRAINT "FK_6a58ed56a12604c076a8e0cfdaa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "tag_user" DROP CONSTRAINT "FK_6a58ed56a12604c076a8e0cfdaa"');
        await queryRunner.query('ALTER TABLE "tag_user" DROP CONSTRAINT "FK_e64a306f3215dbb99bbb26ca599"');
        await queryRunner.query('DROP TABLE "tag_user"');
    }

}
