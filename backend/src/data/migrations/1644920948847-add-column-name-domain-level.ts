import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnNameDomainLevel1644920948847
  implements MigrationInterface
{
  name = 'addColumnNameDomainLevel1644920948847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "domain_level" ADD "name" character varying(100) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "domain_level" DROP COLUMN "name"');
  }
}
