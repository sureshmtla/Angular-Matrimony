import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-setpass',
  templateUrl: './setpass.component.html',
  styleUrls: ['./setpass.component.scss']
})
export class SetpassComponent implements OnInit {

  errors: Errors = new Errors();
  isSubmitting = false;
  setpassForm: FormGroup;
  isValid = false;
  encrypt:string='';
  afReg:boolean=false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.setpassForm = this.fb.group({
      'newPassword': ['', Validators.required],
      'rePassword': ['', Validators.required],
      'encrypt':['']
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        if(data.profile.result=='SUCCESS'){
          this.isValid=true;
          this.encrypt=data.profile.encrypt;
        }else if(data.profile.result=='Expired'){
          this.errors = new Errors();
          //  errors: {[key: string]: string} = {};
          this.errors = JSON.parse('{"errors":{"Set Password":["Link expired"]}}');
          this.isSubmitting = true;
        }else {
          this.errors = JSON.parse('{"errors":{"Expired":["Not Vaild"]}}');
          this.isSubmitting = true;
        }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    this.setpassForm.controls['encrypt'].setValue(this.encrypt);
    const credentials = this.setpassForm.value;
    this.userService
    .setpassword(credentials)
    .subscribe(
      data => {
       // this.router.navigateByUrl('/'),
       this.afReg=true;
       this.isSubmitting = false;
      },
      err => {
        
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}
