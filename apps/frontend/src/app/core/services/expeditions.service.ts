import { Injectable } from "@angular/core";
import { ExpeditionDto } from "src/app/client/api";
import { DisplayExpedition } from "../definitions/events";

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {

  private readonly BASE_IMG_PATH = 'assets/img/expeditions';

  constructor() {}

  toDisplayExpedition(expedition: ExpeditionDto): DisplayExpedition {
    return {
      ...expedition,
      image: `${this.BASE_IMG_PATH}/${expedition.uid}.png`,
    };
  }
}
