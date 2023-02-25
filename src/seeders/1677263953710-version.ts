import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { hash } from 'bcrypt';

export class version1677263953710 implements MigrationInterface {
  name = 'version1677263953710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(User).save([
      {
        email: 'iurru@weef.com.br',
        password: await hash('test test', 10),
        firstName: 'Iurru',
        lastName: 'Test',
      },
      {
        email: 'test@weef.com.br',
        password: await hash('test test', 10),
        firstName: 'Test',
        lastName: 'Test',
      },
    ]);
  }

  public async down(): Promise<void> {
    return null;
  }
}
