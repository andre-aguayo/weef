import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @CreateDateColumn()
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  public updatedAt: Date;

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
