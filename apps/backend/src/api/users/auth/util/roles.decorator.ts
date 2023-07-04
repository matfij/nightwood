import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../user/model/definitions/users";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
