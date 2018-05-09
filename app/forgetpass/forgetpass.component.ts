import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {

  errors: Errors = new Errors();
  isSubmitting = false;
  forgetForm: FormGroup;
  afReg:boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.forgetForm = this.fb.group({
      'username': ['', [Validators.required,Validators.email]]
    });
  }


  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.forgetForm.value;
    this.userService
    .forget(credentials)
    .subscribe(
      data => {
       // this.router.navigateByUrl('/'),
       console.log(data);
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
