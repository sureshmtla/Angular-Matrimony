import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class PremiumpacksService {

  constructor( private apiService: ApiService) { }

  get(): Observable<any> {
    return this.apiService.get('/pro/premiumpacks')
    .map(data => data);
  }

  getPremiumPack(id: string) : Observable<any>{
    return this.apiService.get('/pro/premiumpack/'+id)
        .map(data => data);
  }

  delPremiumPack(id:string) : Observable<any> {
    return this.apiService.delete('/pro/premiumpack/'+id)
       .map(data => data);
  }

  postPremiumPack(id:string,formData:any) : Observable<any>{
    return this.apiService.put('/pro/premiumpack/'+id,formData)
        .map(data => data);
  }
 
}
