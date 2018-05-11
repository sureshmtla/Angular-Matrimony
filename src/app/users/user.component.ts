import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService,ProfilesService,PremiumpacksService } from '../shared';

import { Overlay,overlayConfigFactory } from 'ngx-modialog';
import {  BootstrapModalModule, Modal, bootstrap4Mode,BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { UpdatepremiumComponent } from './updatepremium.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user:any;
  
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private profilesService: ProfilesService,
    private premiumpacksService: PremiumpacksService,
    public modal: Modal) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.user = data.user;
         // console.log(this.user);
      });
  }
  
  sumbitUpdateMe(status){
	this.profilesService.postUserStatus(this.user.uid,status).subscribe(
	      (data) => {
		console.log(data);
	      }
	);
  }
  
  onUpdatePremiumPopup() {
      this.premiumpacksService.get().subscribe(
        (data) => {
          //console.log(data);
          return this.modal.open(UpdatepremiumComponent,  overlayConfigFactory({title:'Update Premium', uid: this.user.uid,premiumpacks:data}, BSModalContext));
          // console.log(data);
          // return data;
      });
  }

}
