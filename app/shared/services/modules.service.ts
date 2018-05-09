import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class ModulesService {

  constructor( private apiService: ApiService) { }

  get(): Observable<any> {
    return this.apiService.get('/modules')
    .map(data => data);
  }

  getModule(type: string) : Observable<any>{
    return this.apiService.get('/module/'+type)
        .map(data => data);
  }

  getModuleField(id: string) : Observable<any>{
    return this.apiService.get('/module/field/'+id)
        .map(data => data);
  }

  delModuleField(id:string) : Observable<any> {
    return this.apiService.delete('/module/field/'+id)
       .map(data => data);
  }

  postModuleData(id:string,formData:any) : Observable<any>{
    return this.apiService.put('/module/update/'+id,formData)
        .map(data => data);
  }

  postModuleField(id:string,formData:any) : Observable<any>{
    return this.apiService.put('/module/update/field/'+id,formData)
        .map(data => data);
  }
 
}
