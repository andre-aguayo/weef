import { SetMetadata } from '@nestjs/common';

import { Role } from '../enums/role.enum';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

const ROLES_KEY = 'roles';
const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);

export { ROLES_KEY, Roles };
