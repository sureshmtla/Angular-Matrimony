import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class UploadFileService {

  constructor(private apiService: ApiService) {}
  
   pushFileToStorage(formdata: FormData): Observable<any> {
     return this.apiService.post('/putfile',formdata)
   }
  
   getFiles(): Observable<string[]> {
     return this.apiService.get('/getallfiles')
   }

   getUnAuthPhoto(uid:string,fname:string): Observable<string[]> {
    return this.apiService.get('/image/'+uid+'/'+fname);
  }
  getAuthPhoto(uid:string,fname:string): Observable<string[]> {
    return this.apiService.get('/photo/'+uid+'/'+fname);
  }
}
