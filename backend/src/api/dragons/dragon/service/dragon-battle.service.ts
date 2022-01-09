import { Injectable } from "@nestjs/common";
import { BattleResult } from "../model/definitions/dragon-battle";
import { BattleResultDto } from "../model/dto/battle-result.dto";
import { DragonDto } from "../model/dto/dragon.dto";

@Injectable()
export class DragonBattleService {

    async executeBattle(ownedDragon: DragonDto, enemyDragon: DragonDto): Promise<Partial<BattleResultDto>> {

        const ownedDragonPower 
            = ownedDragon.strength + ownedDragon.dexterity + ownedDragon.endurance + ownedDragon.endurance + ownedDragon.luck;

        const enemyDragonPower 
            = enemyDragon.strength + enemyDragon.dexterity + enemyDragon.endurance + enemyDragon.endurance + enemyDragon.luck;

        let result = BattleResult.Draw;
        if (ownedDragonPower > enemyDragonPower) result = BattleResult.Win;
        if (ownedDragonPower < enemyDragonPower) result = BattleResult.Lose;

        return { result: result };
    }
}
