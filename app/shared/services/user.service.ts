import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log(user); 
    console.log('test : '+user); 
     

    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {

    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '/signupUser';
    return this.apiService.post('' + route, credentials)
    .map(
      data => { 
        console.log(data);
        this.setAuth(data);    
        return data; 
      }
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

 getsetpass(encrypt:string){
  return this.apiService
  .get('/validate/'+encrypt).map(data => {
    return data;
   });
 }

 getresetpass(encrypt:string){
  return this.apiService
  .get('/resetpassword/'+encrypt).map(data => {
    return data;
   });
 }

 forget(formData:any){
  return this.apiService
  .post('/forgotPassword',formData).map(data => {
    return data;
   });
 }

 signup(formData:any){
  return this.apiService
  .post('/signup',formData).map(data => {
    return data;
   });
 }

 setpassword(formData:any){
  return this.apiService
  .post('/setpassword',formData).map(data => {
    return data;
   });
 }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    });
  }

  resetPass(uid:string,formData:any) {
    return this.apiService
    .post('/reset/pass', formData)
    .map(data => {
      return data;
    });
  }


  inviteuser(uid:string,formData:any) {
    return this.apiService
    .post('/invite/user', formData )
    .map(data => {
      return data;
    });
  }

  getAllUsers(type:string){
    return this.apiService.get('/pro/users/'+type)
    .map(data => data);
  }

  getUser(uid: string) : Observable<any>{
    return this.apiService.get('/view/' + uid)
        .map(data => data);
  }

}
