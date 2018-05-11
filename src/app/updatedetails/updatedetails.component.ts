import { Component, OnInit } from '@angular/core';


import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ProfilesService} from '../shared';

export class CustomModalContext extends BSModalContext {
  public title: string;
  public type : string;
  public moduleFields:any;
  public moduleData:any;
}


@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.scss']
})
export class UpdatedetailsComponent implements OnInit ,CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  constructor( private profilesService: ProfilesService,public dialog: DialogRef<CustomModalContext>) { 
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

    console.log(myformdata);
    this.profilesService.postProfileData('contact',myformdata).subscribe(
      (data => {
        
        //return data;
        this.closeModal();
        location.reload();
      }
    )); 
  }

  ngOnInit() {
  }


}
