import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors,User, UserService} from '../shared';
import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';


export class CustomModalContext extends BSModalContext {
  public title: string;
  public uid : string;
}


@Component({
  selector: 'app-inviteuser',
  templateUrl: './inviteuser.component.html',
  styleUrls: ['./inviteuser.component.scss']
})
export class InviteuserComponent implements OnInit ,CloseGuard, ModalComponent<CustomModalContext>  {
  context: CustomModalContext;

  errors: Errors = new Errors();
  isSubmitting = false;
  inviteForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,private userService: UserService,
    private fb: FormBuilder,
    public dialog: DialogRef<CustomModalContext>) { 
      this.context = dialog.context;
      dialog.setCloseGuard(this);
      this.inviteForm = this.fb.group({
        'displayName': ['', Validators.required],
        'username': ['', Validators.required],
        'mobile': ['', Validators.required]
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
    const credentials = this.inviteForm.value;
    this.errors = new Errors();

    this.userService
    .inviteuser(this.context.uid, credentials)
    .subscribe(
      data => {
        // console.log(data);
        this.dialog.close();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}
