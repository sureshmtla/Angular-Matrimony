import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors,User, UserService} from '../shared';
import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';


export class CustomModalContext extends BSModalContext {
  public title: string;
  public uid: string;
}


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit,CloseGuard, ModalComponent<CustomModalContext>  {
  context: CustomModalContext;

  isSubmitting = false;
  passForm: FormGroup;
  errors: Errors = new Errors();
  

  constructor(private route: ActivatedRoute,
    private router: Router,private userService: UserService,
    private fb: FormBuilder,
    public dialog: DialogRef<CustomModalContext>) { 
      this.context = dialog.context;
      dialog.setCloseGuard(this);
      this.passForm = this.fb.group({
        'currentPassword': ['', Validators.required],
        'newPassword': ['', Validators.required],
        'rePassword': ['', Validators.required]
      });
  }

  beforeDismiss(): boolean {
    return true;
  }

  public closeModal() {
    this.dialog.close();
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.passForm.value;
    this.errors = new Errors();
    
    this.userService
    .resetPass(this.context.uid, credentials)
    .subscribe(
      data => {
        console.log(data);
        this.dialog.close();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }


}
