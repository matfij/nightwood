import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ACCESS_TOKEN, StoreService, USER_DATA } from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private storeService: StoreService,
    private router: Router,
  ) {}

  setUserData(user: any) {
    this.storeService.setItem(USER_DATA, JSON.stringify(user));
  }

  getUserData() {
    return JSON.parse(this.storeService.getItem(USER_DATA));
  }

  setAccessToken(accessToken: string) {
    this.storeService.setItem(ACCESS_TOKEN, accessToken);
  }

  getAccessToken() {
    return this.storeService.getItem(ACCESS_TOKEN);
  }

  logout() {
    this.storeService.clear();
    this.router.navigate(['start/login']);
  }
}
