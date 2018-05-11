import { Component, OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver,Compiler,ComponentFactory  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, HomelistService } from '../shared';
import { User } from './../shared/models';

import { Overlay,overlayConfigFactory } from 'ngx-modialog';
import {  BootstrapModalModule, Modal, bootstrap4Mode,BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { PageprofilesComponent } from './../pageload/pageprofiles.component';
import { UpdatedetailsComponent } from './../updatedetails/updatedetails.component';

import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({ 
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild('matchesContainer', {read: ViewContainerRef}) matchesContainerRef;
  private componentFactory: ComponentFactory<any>;
  public loadingdiv:boolean = false;
  public selectedIndex:number = 0;
    
  constructor(
    private router: Router,
    private userService: UserService,
    private homelistService: HomelistService,
    public modal: Modal,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef, compiler: Compiler) {
      this.componentFactory = this._componentFactoryResolver.resolveComponentFactory(PageprofilesComponent);
  }
  apiUrl = environment.api_url;
  isAuthenticated: boolean;
  isSearch:boolean=false;
  listMathes:Array<Object>;
  currentUser: User;
  ispopup:boolean=true;
  opop:boolean=false;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        //console.log(userData);
      }
    )
    
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        // set the article list accordingly
        if (authenticated) {
          if(this.currentUser!=null && (this.currentUser.gender==null || this.currentUser.gender=='')){
            this.homelistService.getModuleData('contact','quick')
            .subscribe((data) => {
              this.ispopup = window.localStorage['ispopup'];
              if(!this.ispopup){
                  window.localStorage['ispopup']=true;
                  this.onClickPopup(data);
              }
              });	
          }else{
                this.getAllData(0);
            }
        } else {
            this.router.navigateByUrl('/login');
        }
      }
    ); 
    //  console.log(this.textjson);
  }

  onClickPopup(data) {
    return this.modal.open(UpdatedetailsComponent,  overlayConfigFactory({title:'Profile Details', type: 'contact', moduleFields:data.modules,moduleData:data.OBJECT_MAP}, BSModalContext));
 }

  getAllData(num) {
    this.loadingdiv=true;
    this.selectedIndex=num;
    this.homelistService.getAll()
    .subscribe(data => {
      this.listMathes=data['matches'];
      this.loadingdiv=false;
      this.matchesContainerRef.clear();
      let instance  = this.matchesContainerRef.createComponent(this.componentFactory, 0).instance;
      instance.lMathes = data['matches'];
      instance.currentUser=this.currentUser;
    });
  }

  public sendData(data,cuser){
    console.log('@@@@@@@@@@@@@@@@@@@2 from head');
    console.log(data);
  }

  getAllMatchesData(type,status,num){
    this.loadingdiv=true;
    this.selectedIndex=num;
    //console.log('type : '+type+' status : '+status);
    this.homelistService.getAllMatches(type,status)
    .subscribe(data => {
      this.listMathes=data['matches'];
      this.loadingdiv=false;
 //     console.log(data);
      
      this.matchesContainerRef.clear();
      let instance  = this.matchesContainerRef.createComponent(this.componentFactory, 0).instance;
      instance.lMathes = data['matches'];
      instance.currentUser=this.currentUser;
    });
  }

  /*
  function funViewed(){
    loadpage('lMatches','/pro/me/Viewed/Matches');
  }
  
  function funNotInterested(){
    loadpage('lMatches','/pro/not/Interested/Matches');
  }
  
  function funNotViewed(){
    loadpage('lMatches','/pro/not/Viewed/Matches');
  }
  
  function funViewdByMe(){
    loadpage('lMatches','/pro/other/ViewedAll/Matches');
  }
  
  function funInterested(){
    loadpage('lMatches','/pro/me/Interested/Matches');
  }
  
  function funInterestByMe(){
    loadpage('lMatches','/pro/other/Interested/Matches');
  }
  
  function funShortMe(){
    loadpage('lMatches','/pro/me/shortlist');
  }
  
  function funShortOther(){
    loadpage('lMatches','/pro/other/shortlist');
  }
  
  function funAccepted(){
    loadpage('lMatches','/pro/me/Accepted/Matches');
  }
  
  function funAcceptedByMe(){
    loadpage('lMatches','/pro/other/Accepted/Matches');
  }
  
  function funRejected(){
    loadpage('lMatches','/pro/me/Rejected/Matches');
  }
  
  function funRejectedByMe(){
    loadpage('lMatches','/pro/other/Rejected/Matches');
  }
  
  function funLastestMatches(){
    loadpagewithdata('lMatches','/pro/my/matches','title=&firstName=matri&lastname=mony');
  }
  
  function funLastestUpdatedMatches(){
    loadpagewithdata('lMatches','/pro/my/matches','title=&firstName=matri&lastname=mony&field15=modifiedTime');
  } */
  


}




