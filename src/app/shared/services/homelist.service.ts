import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class HomelistService {
 
  constructor (
    private apiService: ApiService
  ) {}

  
  getAll(): Observable<[string]> {
    return this.apiService.get('/view/matches')
           .map(data => data);
  }

  getAllMatches(type:string,status:string){
    return this.apiService.get('/view/'+type+'/'+status+'/matches')
    .map(data => data);
  }
  
  getModuleData(type:string,action:string){
  	 return this.apiService.get('/d/'+type+'/'+action)
    	.map(data => data);
  }

}
