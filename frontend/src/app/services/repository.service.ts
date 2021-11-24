import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthResponseDto } from "../client/api";
import { ACCESS_TOKEN, StoreService, USER_DATA } from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private router: Router,
    private storeService: StoreService,
  ) {}

  setUserData(user: AuthResponseDto) {
    this.storeService.setItem(USER_DATA, JSON.stringify(user));
  }

  getUserData(): AuthResponseDto {
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
