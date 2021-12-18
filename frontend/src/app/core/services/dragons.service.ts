import { Injectable } from "@angular/core";
import { DragonDto, DragonNature } from "src/app/client/api";
import { DRAGON_MAX_ADULT_LEVEL, DRAGON_MAX_EGG_LEVEL, DRAGON_MAX_KID_LEVEL, DRAGON_MAX_SAGE_LEVEL } from "../configuration";
import { DisplayDragon } from "../definitions/dragons";

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  private readonly BASE_PATH = 'assets/img/dragons';
  private readonly EXTENSION = 'png';

  setDragonImage(dragon: DragonDto): DisplayDragon {
    let nature: string;
    switch (dragon.nature) {
      case DragonNature.Fire: { nature = 'fire'; break; }
      case DragonNature.Water: { nature = 'water'; break; }
      case DragonNature.Wind: { nature = 'wind'; break; }
      case DragonNature.Earth: { nature = 'earth'; break; }
    };

    let adulthood: number;
    if (dragon.level < DRAGON_MAX_EGG_LEVEL) adulthood = 1;
    if (dragon.level < DRAGON_MAX_KID_LEVEL) adulthood = 2;
    if (dragon.level < DRAGON_MAX_ADULT_LEVEL) adulthood = 3;
    if (dragon.level < DRAGON_MAX_SAGE_LEVEL) adulthood = 4;
    else adulthood = 0;

    const image = `${this.BASE_PATH}/${nature}-1-${adulthood}.${this.EXTENSION}`;
    return {
      ...dragon,
      image: image,
    };
  }

}
