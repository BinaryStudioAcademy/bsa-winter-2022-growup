import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDescriptionColumnToCompanyTable1644493898280
  implements MigrationInterface
{
  name = 'addDescriptionColumnToCompanyTable1644493898280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "company" ADD "description" character varying(250) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "company" DROP COLUMN "description"');
  }
}
