import { ExpeditionDto } from "src/app/client/api";

export interface DisplayExpedition extends ExpeditionDto {
  hint: string;
  image: string;
}
