import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {  UserService } from '../shared';

@Injectable() 
export class SetpassResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<any> {

  return this.userService.getsetpass(route.params['encrypt'])
           .catch((err) => this.router.navigateByUrl('/'));
  }

}
