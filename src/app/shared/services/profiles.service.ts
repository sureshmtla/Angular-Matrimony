import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Profile } from '../models';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  getUserDetails(uid:string): Observable<any>{
    return this.apiService.get('/pro/user/' + uid)
        .map(data => data);
  }
  
  postUserStatus(uid:string,status:string): Observable<any>{
      return this.apiService.post('/pro/user/admin/status', {'uid':uid,'status':status})
          .map(data => data);
  } 
  
  postUserPremiumUpdate(updetails:any) {
      return this.apiService.post('/pro/user/update/premiumpack',updetails)
      .map(data => data);
  }
  
  searchProfiles(searchForm:any){
    return this.apiService.post('/view/search',searchForm)
      .map(data => data);
  }

  getOthersProfile(uid: string) : Observable<any>{    return this.apiService.get('/view/' + uid)
        .map(data => data);
  }
  
  get(): Observable<Profile> {
    return this.apiService.get('/view/profile')
           .map(data => data);
  }

  postProfileData(type:String,formData:any) : Observable<any>{
    return this.apiService.put('/d/save/' + type,formData)
        .map(data => data);
  }
  
   postReqProfileData(uid:string,status:string,type:String) : Observable<any>{
      return this.apiService.post('/view/update/' + type,{'uid':uid,'type':status})
          .map(data => data);
  }

  postCountMinus(uid:string,type:String){
    return this.apiService.post('/pro/user/'+ uid+'/c/'+type,{})
    .map(data => data);
  }
 
  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow',{})
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow')
  }

}
