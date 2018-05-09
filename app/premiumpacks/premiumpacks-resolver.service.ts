import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {  PremiumpacksService } from '../shared';

@Injectable() 
export class PremiumpacksResolver implements Resolve<any> {
  constructor(
    private premiumpacksService: PremiumpacksService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<any> {

  return this.premiumpacksService.get()
           .catch((err) => this.router.navigateByUrl('/'));
  }



}
