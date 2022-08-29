import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../user/model/definitions/user-role";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
