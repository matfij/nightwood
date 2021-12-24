import { Injectable } from "@angular/core";
import { ItemDto } from "src/app/client/api";
import { DisplayItem } from "../definitions/items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly BASE_NAME_PATH = 'items';
  private readonly BASE_IMG_PATH = 'assets/img/items';
  private readonly EXTENSION = 'png';

  setItemImage(item: ItemDto): DisplayItem {
    const name = `${this.BASE_NAME_PATH}.${item.name}`;
    const image = `${this.BASE_IMG_PATH}/${item.name}.${this.EXTENSION}`;
    return {
      ...item,
      name: name,
      image: image,
    };
  }
}
