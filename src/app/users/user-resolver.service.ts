import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProfilesService } from '../shared';

@Injectable()
export class UserResolverService implements Resolve<any> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.profilesService.getUserDetails(route.params['uid'])
           .catch((err) => this.router.navigateByUrl('/'));
  }
}
