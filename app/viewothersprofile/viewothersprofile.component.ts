import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService, Profile,ProfilesService } from '../shared';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface ,SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-viewothersprofile',
  templateUrl: './viewothersprofile.component.html',
  styleUrls: ['./viewothersprofile.component.scss']
})
export class ViewothersprofileComponent implements OnInit {

  public show: boolean = true;


  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor( private route: ActivatedRoute,
    private userService: UserService,
    private profilesService: ProfilesService,
    private flashMessagesService: FlashMessagesService) { }
    public reqProcessing:boolean = false;
    user:User;

    public imgURLs:Array<string> = []; 
    isAuthenticated: boolean;
    contact:any;
    family:any;
    lifeStyle:any;
    location:any;
    profession:any;
    religion:any;
    profileView:any;
    currentUser: User;
    isUser: boolean;
    apiUrl = environment.api_url;

    contactModule:any;
    familyDetailsModule:any;
    lifeStyleModule:any;
    locationdetailsModule:any;
    professionalinformationModule:any;
    religionModule:any;
    
  ngOnInit() {

    this.route.data.subscribe(
      (data) => {
        this.profileView = data.profile.profileView;
        this.contact = data.profile.contact;
        this.family = data.profile.family;
        this.lifeStyle = data.profile.lifestyle;
        this.location = data.profile.location;
        this.profession = data.profile.profession;
        this.religion = data.profile.religion;
        this.user = data.profile.user;

        this.contactModule = data.profile.modules.contact;
        this.familyDetailsModule = data.profile.modules.familydetails;
        this.lifeStyleModule = data.profile.modules.lifestyle;
        this.locationdetailsModule = data.profile.modules.locationdetails;
        this.professionalinformationModule = data.profile.modules.professionalinformation;
        this.religionModule = data.profile.modules.religion;
        this.currentUser = data.profile.currentUser;
        // Load the current user's data.
       // console.log(data);
        
       if(this.user.imgLockedURL!=null && this.user.imgLockedURL!=''){
          this.imgURLs.push(this.user.imgLockedURL);
       }else{
        this.imgURLs.push(this.apiUrl+"/image/"+this.contact.uid+"/1.jpg");
         if(this.user.imgURLs!=null){
           var iurls = this.user.imgURLs.split(",");
           for(var i=0;i<iurls.length;i++)
            this.imgURLs.push(this.apiUrl+"/"+iurls[i]);
         }
       }

        //this.userService.currentUser.subscribe(
        //  (userData: User) => {
        //    this.currentUser = userData;
           // this.isUser = (this.currentUser.username === this.contact.uid);
        //  }
        //);
        
    });

  /*  document.addEventListener('DOMContentLoaded', () => {
      const slider = document.querySelector('.js_slider');
      lory(slider, {
          infinite: 1
      });
    });  */

  }

  public onIndexChange(e){

  }
 
  
  showdetails(type,name,label){
      if(this.currentUser.premiumId>0 && (this.currentUser.mobileCount>0 || this.currentUser.horoscopeCount>0)){
        var htmlval = '';
        var typecount='mobile';
        if(type=='family' && this.currentUser.mobileCount>0){
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.family[name]+'</div></div>';
        }else if(type=='religion' && this.currentUser.horoscopeCount>0){
          typecount='horoscope';
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.religion[name]+'</div></div>';
        }else if(type=='contact' && this.currentUser.mobileCount>0){
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.contact[name]+'</div></div>';
        }else if(type=='lifestyle' && this.currentUser.mobileCount>0){
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.lifeStyle[name]+'</div></div>';
        }else if(type=='location' && this.currentUser.mobileCount>0){
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.location[name]+'</div></div>';
        }else if(type=='profession' && this.currentUser.mobileCount>0){
          htmlval='<div class="row"><label class="col-3 text-muted">'+label +'</label><div class="col-9 text-capitalize">'+this.profession[name]+'</div></div>';
        }
       // this.profilesService.postCountMinus(this.currentUser.uid,typecount).subscribe(
        //  data => { 
            $('.modal-body').empty().append(htmlval);
            $('.modal-title').html('Premium Data : '+label);
            $('#popupTrigger').click();
        //  },
        //  err => {
        //    console.log(err); 
        //  });
      }
  }

  updateReq(uid,type,c) {
  	this.profilesService.postReqProfileData(uid,type,'req')
  	.subscribe(data => {
      //console.log(data);
      this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
      if(type=='photo') {
        c.requestPhoto=1;
      }else if(type=='horoscope'){
       c.requestHoroscope=1;
      }else if(type=='mobile'){
      c.requestMobile=1;
      }else if(type=='message'){
        c.requestMessage=1;
      }
  	});
    }
  
    updateProfileStatus(uid,type,c){
      this.reqProcessing=true;
  	this.profilesService.postReqProfileData(uid,type,'status')
  	.subscribe(data => {
      //console.log(data);
      this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
      this.reqProcessing=false;
      c.status = type;
  	});
  }



}
