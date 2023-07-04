import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryService } from '../services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private repositoryService: RepositoryService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url.includes('start') && this.repositoryService.getAccessToken()) {
      this.router.navigate(['game']);
      return false;
    } else if (state.url.includes('start') && !this.repositoryService.getAccessToken()) {
      return true;
    }
    else if (this.repositoryService.getAccessToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
