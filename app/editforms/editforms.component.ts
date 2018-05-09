import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public title: string;
  public type : string;
  public contentObject :any;
  public moduleFields:any;
}

@Component({
  selector: 'app-editforms',
  templateUrl: './editforms.component.html',
  styleUrls: ['./editforms.component.scss']
})
export class EditformsComponent  implements OnInit,CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
 
  constructor(public dialog: DialogRef<CustomModalContext>) { 
    this.context = dialog.context;
    // this.wrongAnswer = true;
     dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true;
  }

  //beforeClose(): boolean {
  //  return this.wrongAnswer;
 // }

  public closeModal() {
    this.dialog.close();
  }

  public onSave() {
    
  }
  
  ngOnInit() {
  }

}
