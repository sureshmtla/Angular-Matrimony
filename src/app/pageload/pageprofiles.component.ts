import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, ProfilesService } from '../shared';
import { FlashMessagesService } from 'angular2-flash-messages';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pageprofiles',
  templateUrl: './pageprofiles.component.html',
  styleUrls: ['./pageprofiles.component.scss']
})
export class PageprofilesComponent implements OnInit {

  lMathes:any;
  apiUrl = environment.api_url;
  currentUser: User; 
  public reqProcessing:string='id';

  constructor(private route: ActivatedRoute,
    private profilesService: ProfilesService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  
  updateReq(uid,type,c) {

	this.profilesService.postReqProfileData(uid,type,'req')
	.subscribe(data => {
    this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
    //console.log(data);
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
    this.reqProcessing=uid;
    this.profilesService.postReqProfileData(uid,type,'status')
    .subscribe(data => {
      this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
      this.reqProcessing='id';
      c.ostatus = type;
      //console.log(data);
    });
  }
  
  


}
