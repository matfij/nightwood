import { Injectable } from '@angular/core';
import { STORAGE_PREFIX } from 'src/app/core/configuration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private keyPrefix: string;

  constructor() {
    this.keyPrefix = STORAGE_PREFIX;
  }

  public getItem(key: string): string {
    return localStorage.getItem(this.keyPrefix + key) || '';
  }

  public setItem(key: string, item: string) {
    localStorage.setItem(this.keyPrefix + key, item);
  }

  public getComplexItem<T>(key: string): T {
    const stringItem = localStorage.getItem(this.keyPrefix + key) || '{}';
    return JSON.parse(stringItem);
  }

  public setComplexItem<T>(key: string, item: T) {
    const stringItem = JSON.stringify(item);
    localStorage.setItem(this.keyPrefix + key, stringItem);
  }

  public removeItem(key: string) {
    localStorage.removeItem(this.keyPrefix + key);
  }

  public clear() {
    localStorage.clear();
  }
}

export const USER_DATA = 'user-data';
export const REFRESH_TOKEN = 'refresh-token';
export const ACCESS_TOKEN = 'access-token';
