import { Component, OnInit } from '@angular/core';
import { PremiumpacksService } from '../shared';

import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public title: string;
  public type : string;
  public moduleFields:any;
  public moduleData:any;
}

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss']
})
export class PackComponent implements OnInit,CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  constructor(private premiumpacksService:PremiumpacksService,public dialog: DialogRef<CustomModalContext>) { 
    this.context = dialog.context;
     dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true;
  }

  public closeModal() {
    this.dialog.close();
  }

  objectifyForm(formArray) {//serialize data function
    
      var returnArray = {};
      for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
    }

  public onSavePack(){
    var myformdata=this.objectifyForm($("#packForm").serializeArray());
    this.premiumpacksService.postPremiumPack('0',myformdata).subscribe(
      (data => {
        console.log(data);
        //return data;
        this.closeModal();
        location.reload();
      }
    ));
  }
  ngOnInit() {
  }

}
