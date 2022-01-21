export interface DisplayExpeditionLoot {
  name: string;
  quantity: number;
}

export interface DisplayExpeditionReport {
  generationDate: number;
  dragonName: string;
  expeditionName?: string;
  experience: number;
  gold: number;
  loots?: DisplayExpeditionLoot[];
}
