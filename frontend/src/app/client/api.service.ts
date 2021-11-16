import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../definitions/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  constructor(
    private httpClient: HttpClient,
  ) {}

  loginUser(user: any): Observable<User> {
    return this.httpClient.post<any>(this.BASE_URL + '/auth/login', user);
  }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL + '/auth/register', user);
  }

}
