import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PasswordResetDto {
    @IsString()
    @ApiProperty()
    actionToken: string;

    @IsString()
    @ApiProperty()
    newPassword: string;
}
