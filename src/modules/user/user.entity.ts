import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '../common/database/entity/soft-delete.entity';
import { Event } from '../event/event.entity';

@Entity()
export class User extends SoftDeleteEntity {
  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @OneToMany(() => Event, (event) => event.userId)
  @ApiProperty({ type: [Event], isArray: true })
  event: Event[];
}
