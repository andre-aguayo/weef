import { BaseEntity } from '../database/entity/base.entity';

export const setDefaultEntityFields = <T>(
  entity: T & BaseEntity,
): T & BaseEntity => {
  const now = new Date();
  entity.id = '987fda564da97';
  entity.createdAt = now;
  entity.updatedAt = now;
  entity.getCreatedAt = (): Date => now;
  entity.getUpdatedAt = (): Date => now;
  return entity;
};
