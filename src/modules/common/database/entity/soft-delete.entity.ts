import { DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export abstract class SoftDeleteEntity extends BaseEntity {
  @DeleteDateColumn({ nullable: true })
  @ApiProperty()
  public deletedAt: Date;

  public getDeletedAt(): Date {
    return this.deletedAt;
  }
}
