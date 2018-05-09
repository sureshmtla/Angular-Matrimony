import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Overlay,overlayConfigFactory } from 'ngx-modialog';
import {  BootstrapModalModule, Modal, bootstrap4Mode,BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { PremiumpacksService } from '../shared';

import { PackComponent } from './pack.component';

@Component({
  selector: 'app-premiumpacks',
  templateUrl: './premiumpacks.component.html',
  styleUrls: ['./premiumpacks.component.scss']
})
export class PremiumpacksComponent implements OnInit {
  premiumpacks : Array<Object>;

  constructor(private route: ActivatedRoute,private premiumpacksService:PremiumpacksService,public modal: Modal) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.premiumpacks=data.premiumpack;
      });
  }

  openPack(id) {
    this.premiumpacksService.getPremiumPack(id).subscribe(
      (data) => {
        return this.modal.open(PackComponent,  overlayConfigFactory({title:'Premium Pack', type: 'premiumpack', moduleFields:data.modules,moduleData:data.premiumpack }, BSModalContext));
        //console.log(data);
        //return data;
      });
   // 
  }

  deletePack(id) {
   // console.log('id :::::::::::::: '+id);
    this.premiumpacksService.delPremiumPack(id).subscribe(
      (data) => {
        location.reload();
        //console.log(data);
      });
  }

  newPack(id) {
    this.premiumpacksService.getPremiumPack(id).subscribe(
      (data) => {
        return this.modal.open(PackComponent,  overlayConfigFactory({title:'Premium Pack', type: 'premiumpack', moduleFields:data.modules,moduleData:data.premiumpack }, BSModalContext));
        //console.log(data);
        //return data;
      });
   // 
  }

}
