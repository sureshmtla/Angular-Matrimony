import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Profile, ProfilesService } from '../shared';

@Injectable()
export class ViewothersprofileService implements Resolve<Profile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.profilesService.getOthersProfile(route.params['uid'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
