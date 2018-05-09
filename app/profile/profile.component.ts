import { Component, OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver,Compiler,ComponentFactory } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Overlay,overlayConfigFactory } from 'ngx-modialog';
import {  BootstrapModalModule, Modal, bootstrap4Mode,BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { User, UserService, Profile, ProfilesService,UploadFileService } from '../shared';
import { FileUploadComponent } from './../file-upload/file-upload.component';

import { EditformsComponent } from './../editforms/editforms.component';

import { EditloadComponent } from './../editload/editload.component';
import { PageloadComponent } from './../pageload/pageload.component';
import { PageprofilesComponent } from './../pageload/pageprofiles.component';

import { ResetpassComponent } from './../resetpass/resetpass.component';
import { InviteuserComponent } from './../inviteuser/inviteuser.component';


import { environment } from '../../environments/environment';

// run the plugin to work with version 4 of bootstrap
bootstrap4Mode();

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  providers: [Modal]
})

export class ProfileComponent implements OnInit {
  
  @ViewChild('contactContainer', {read: ViewContainerRef}) viewContainerRef;
  @ViewChild('religionContainer', {read: ViewContainerRef}) religionContainerRef;
  @ViewChild('preferenceContainer', {read: ViewContainerRef}) preferenceContainerRef;
  @ViewChild('professionalinformationContainer', {read: ViewContainerRef}) professionalinformationContainerRef;
  @ViewChild('familydetailsContainer', {read: ViewContainerRef}) familydetailsContainerRef;
  @ViewChild('locationdetailsContainer', {read: ViewContainerRef}) locationdetailsContainerRef;
  @ViewChild('lifestyleContainer', {read: ViewContainerRef}) lifestyleContainerRef;

  @ViewChild('matchesContainer', {read: ViewContainerRef}) matchesContainerRef;

  public imgurl1:string=''; 
  public imgurl2:string=''; 
  public imgurl3:string=''; 
  public imgurl4:string=''; 
  public imgurl5:string=''; 
  public imgurl6:string=''; 
  public imgurl7:string=''; 
  public horoscopeUrl:string='';

  private componentFactory: ComponentFactory<any>;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private profilesService: ProfilesService,
    private uploadFileService : UploadFileService,
    public modal: Modal,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef, compiler: Compiler) { 
  }

  contactedit:boolean=false;
  religionedit:boolean=false;
  preferenceedit:boolean=false;
  professionalinformationedit:boolean=false;
  familydetailsedit:boolean=false;
  locationdetailsedit:boolean=false;
  lifestyleedit:boolean=false;

  apiUrl = environment.api_url;
  currentUser: User;
  isUser: boolean;

  contact:any;
  family:any;
  lifestyle:any;
  location:any;
  profession:any;
  religion:any;
  profileView:any;
  prefContact:any;

  contactModule:any;
  familyDetailsModule:any;
  lifestyleModule:any;
  locationdetailsModule:any;
  professionalinformationModule:any;
  religionModule:any;
  prefContactModule:any;
 
  ngOnInit() {
    
    this.route.data.subscribe(
      (data) => {
        console.log(data);
       this.profileView = data.profile.profileView;
        this.contact = data.profile.contact;
        this.family = data.profile.family;
        this.lifestyle = data.profile.lifestyle;
        this.location = data.profile.location;
        this.profession = data.profile.profession;
        this.religion = data.profile.religion;
        this.prefContact = data.profile.prefContact;

        this.contactModule = data.profile.modules.contact;
        //familyDetails
        this.familyDetailsModule = data.profile.modules.familydetails;
        this.lifestyleModule = data.profile.modules.lifestyle;
        this.locationdetailsModule = data.profile.modules.locationdetails;
        this.professionalinformationModule = data.profile.modules.professionalinformation;
        this.religionModule = data.profile.modules.religion;
        this.prefContactModule = data.profile.modules.preference;
        // Load the current user's data.

        console.log(this.familyDetailsModule);
        

        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            console.log(userData);
            this.imgurl1 = this.apiUrl+'/image/'+this.currentUser.uid+'/1.jpg';
            if(userData.imgURLs!=null) {
              var imgurl = userData.imgURLs.split(",");
              this.imgurl2 = this.apiUrl+'/'+(imgurl.length>=1?imgurl[0]:('/image/'+this.currentUser.uid+'/2.jpg'));
              this.imgurl3 = this.apiUrl+'/'+(imgurl.length>=2?imgurl[1]:('/image/'+this.currentUser.uid+'/3.jpg'));
              this.imgurl4 = this.apiUrl+'/'+(imgurl.length>=3?imgurl[2]:('/image/'+this.currentUser.uid+'/4.jpg'));
              this.imgurl5 = this.apiUrl+'/'+(imgurl.length>=4?imgurl[3]:('/image/'+this.currentUser.uid+'/5.jpg'));
              this.imgurl6 = this.apiUrl+'/'+(imgurl.length>=5?imgurl[4]:('/image/'+this.currentUser.uid+'/6.jpg'));
              this.imgurl7 = this.apiUrl+'/'+(imgurl.length>=6?imgurl[5]:('/image/'+this.currentUser.uid+'/7.jpg'));
            }
            if(userData.horoscopeURLs!=null && userData.horoscopeURLs!='')
              this.horoscopeUrl = this.apiUrl+'/'+userData.horoscopeURLs;
            else this.horoscopeUrl = '';
          }
        );
      }
    );
  }


  onClickEditPage(typ){
     console.log(typ);
      this.componentFactory = this._componentFactoryResolver.resolveComponentFactory(EditloadComponent);
      $('.'+typ+'Load').empty();
      if(typ=='contact') {
        this.contactedit=true;     
        this.viewContainerRef.clear();
        let instance  = this.viewContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.contactModule;
        instance.moduleData = this.contact;
        instance.type=typ;
      }else if(typ=='religion'){
        this.religionedit=true;
        this.religionContainerRef.clear();
        let instance  = this.religionContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.religionModule;
        instance.moduleData = this.religion;
        instance.type=typ;
      }else if(typ=='preference'){
        this.preferenceedit=true;
        this.preferenceContainerRef.clear();
        let instance  = this.preferenceContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.prefContactModule;
        instance.moduleData = this.prefContact;
        instance.type=typ;
      }else if(typ=='professionalinformation'){
        this.professionalinformationedit=true;
        this.professionalinformationContainerRef.clear();
        let instance  = this.professionalinformationContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.professionalinformationModule;
        instance.moduleData = this.profession;
        instance.type=typ;
      }else if(typ=='familydetails'){
        this.familydetailsedit=true;
        this.familydetailsContainerRef.clear();
        let instance  = this.familydetailsContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.familyDetailsModule;
        instance.moduleData = this.family;
        instance.type=typ;
      }else if(typ=='locationdetails'){
        this.locationdetailsedit=true;
        this.locationdetailsContainerRef.clear();
        let instance  = this.locationdetailsContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.locationdetailsModule;
        instance.moduleData = this.location;
        instance.type=typ;
      }else if(typ=='lifestyle'){
        this.lifestyleedit=true;
        this.lifestyleContainerRef.clear();
        let instance  = this.lifestyleContainerRef.createComponent(this.componentFactory, 0).instance;
        instance.moduleFields = this.lifestyleModule;
        instance.moduleData = this.lifestyle;
        instance.type=typ;
      }

  }

   objectifyForm(formArray) {//serialize data function
    
      var returnArray = {};
      for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
    }

  onClickLoadPage(typ){
    var myformdata=this.objectifyForm($("#"+typ+"Form").serializeArray());
    
    console.log('terx : '+typ);
    this.profilesService.postProfileData(typ,myformdata).subscribe(
      data => { 
        this.componentFactory = this._componentFactoryResolver.resolveComponentFactory(PageloadComponent);
        $('.'+typ+'Load').empty();
        if(typ=='contact') {
          this.contactedit=false;
          this.viewContainerRef.clear();
          let instance  = this.viewContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.contact = data.OBJECT_MAP;
        }else if(typ=='religion'){
          this.religionedit=false;
          this.religionContainerRef.clear();
          let instance  = this.religionContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.religion = data.OBJECT_MAP;
        }else if(typ=='preference'){
          this.preferenceedit=false;
          this.preferenceContainerRef.clear();
          let instance  = this.preferenceContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.prefContact = data.OBJECT_MAP;
        }else if(typ=='professionalinformation'){
          this.professionalinformationedit=false;
          this.professionalinformationContainerRef.clear();
          let instance  = this.professionalinformationContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.profession = data.OBJECT_MAP;
        }else if(typ=='familydetails'){
          this.familydetailsedit=false;
          this.familydetailsContainerRef.clear();
          let instance  = this.familydetailsContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type='familyDetails';
          this.family = data.OBJECT_MAP;

          console.log(data);
        }else if(typ=='locationdetails'){
          this.locationdetailsedit=false;
          this.locationdetailsContainerRef.clear();
          let instance  = this.locationdetailsContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.location = data.OBJECT_MAP;
        }else if(typ=='lifestyle'){
          console.log(data);
          this.lifestyleedit=false;
          this.lifestyleContainerRef.clear();
          let instance  = this.lifestyleContainerRef.createComponent(this.componentFactory, 0).instance;
          instance.moduleFields = data.modules;
          instance.moduleData = data.OBJECT_MAP;
          instance.type=typ;
          this.lifestyle = data.OBJECT_MAP;
          console.log('--------------');
          console.log(data.modules);
        }
      },
      err => {
        console.log(err); 
      }
    ); 
  }

  getImage() {
    this.uploadFileService.getUnAuthPhoto(this.currentUser.uid,"1.png").subscribe(
      (data => {
        console.log(data);
        return data;
      }
    ));
  }

  onClickPopup(tid) {
    var dialog = this.modal.open(FileUploadComponent,  overlayConfigFactory({ type: 'user', typeId: tid }, BSModalContext));
    dialog.result.then( d =>  {
      if(tid==1)
        this.imgurl1=d.image;
      else if(tid==2)
        this.imgurl2=d.image;
      else if(tid==3)
        this.imgurl3=d.image;
      else if(tid==4)
        this.imgurl4=d.image;
      else if(tid==5)
        this.imgurl5=d.image;
      else if(tid==6)
        this.imgurl6=d.image;
      else if(tid==7)
        this.imgurl7=d.image;
    });
    return true;
  }

  onHoroscopePopup(){
    return this.modal.open(FileUploadComponent,  overlayConfigFactory({ type: 'horoscope', typeId: 0 }, BSModalContext));
  }
 
  onEditPopup(typ) {
    return this.modal.open(EditformsComponent,  overlayConfigFactory({ type: typ, title: 'Basic',contentObject:this.contact,moduleFields:this.contactModule }, BSModalContext));
  }


  onResetPassPopup() {
    return this.modal.open(ResetpassComponent,  overlayConfigFactory({ title: 'Password Reset', uid: this.currentUser.uid }, BSModalContext));
  }


  onInvitePopup() {
    return this.modal.open(InviteuserComponent,  overlayConfigFactory({ title: 'Invite', uid: this.currentUser.uid }, BSModalContext));
  }
  
}
