import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixTagUser1647972633094 implements MigrationInterface {
    name = 'fixTagUser1647972633094';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "registration_token" ADD CONSTRAINT "FK_15840a36225195afa758c7a407b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "registration_token" DROP CONSTRAINT "FK_15840a36225195afa758c7a407b"');
    }

}
