import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthDto } from "src/app/client/api";
import { ACCESS_TOKEN, REFRESH_TOKEN, StoreService, USER_DATA } from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private router: Router,
    private storeService: StoreService,
  ) {}

  setUserData(user: UserAuthDto) {
    this.storeService.setItem(USER_DATA, JSON.stringify(user));
  }

  getUserData(): UserAuthDto {
    const user = this.storeService.getItem(USER_DATA);
    return user ? JSON.parse(user) : null;
  }

  setAccessToken(accessToken: string) {
    this.storeService.setItem(ACCESS_TOKEN, accessToken);
  }

  setRefreshToken(refreshToken: string) {
    this.storeService.setItem(REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string {
    return this.storeService.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string {
    return this.storeService.getItem(REFRESH_TOKEN);
  }

  logout() {
    this.storeService.clear();
    this.router.navigate(['start/login']);
  }

  clearUserData() {
    this.storeService.clear();
  }
}
