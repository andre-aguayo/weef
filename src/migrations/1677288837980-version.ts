import { MigrationInterface, QueryRunner } from 'typeorm';

export class version1677288837980 implements MigrationInterface {
  name = 'version1677288837980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
  }
}
