import { MigrationInterface, QueryRunner } from 'typeorm';

export class languageCertificateImage1647881911641 implements MigrationInterface {
    name = 'languageCertificateImage1647881911641';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "language" ADD "certificateImage" character varying');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "language" DROP COLUMN "certificateImage"');
    }

}
