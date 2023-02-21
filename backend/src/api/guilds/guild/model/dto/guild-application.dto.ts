import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";

export class GuildApplicatonDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    user: Partial<UserDto>;

    @ApiPropertyOptional()
    message?: string;
}
