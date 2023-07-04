import { ApiProperty } from "@nestjs/swagger";

export class BoosterActivateDto {
    
    @ApiProperty()
    dragonId: number;

    @ApiProperty()
    boosterRecipeUid: string;
}
