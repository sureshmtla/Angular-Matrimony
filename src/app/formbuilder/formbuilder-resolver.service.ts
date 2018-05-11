import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ModulesService } from '../shared';

@Injectable()
export class FormbuilderResolver implements Resolve<any> {
  constructor(
    private modulesService: ModulesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.modulesService.getModule(route.params['type'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
