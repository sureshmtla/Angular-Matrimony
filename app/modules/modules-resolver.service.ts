import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {  ModulesService } from '../shared';

@Injectable() 
export class ModulesResolver implements Resolve<any> {
  constructor(
    private modulesService: ModulesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<any> {

  return this.modulesService.get()
           .catch((err) => this.router.navigateByUrl('/'));
  }



}
