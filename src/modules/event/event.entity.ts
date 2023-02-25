import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from '../common/database/entity/soft-delete.entity';
import { User } from '../user/user.entity';

@Entity()
export class Event extends SoftDeleteEntity {
  @ManyToOne(() => User)
  @ApiProperty({ type: User })
  user: User;

  @Column()
  @ApiProperty()
  userId: string;

  @Column()
  @ApiProperty()
  eventName: string;

  @Column()
  @ApiProperty()
  eventDate: Date;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  state: string;

  @Column()
  @ApiProperty()
  complement: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  image: string;
}
