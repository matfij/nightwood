import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";
import { Skill } from "../definitions/dragon-skills";

/**
 * Increase base speed stat accordingly to the points
 */
export const InnateSpeed: Skill = {
    name: 'InnateSpeed',
    level: 1,
    nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind]
}
