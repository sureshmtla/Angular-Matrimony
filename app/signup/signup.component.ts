import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errors: Errors = new Errors();
  isSubmitting = false;
  signupForm: FormGroup;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.signupForm = this.fb.group({
      'displayName': ['', Validators.required],
      'username': ['', [Validators.required,Validators.email]],
      'mobile': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.signupForm.value;
    this.userService
    .signup(credentials)
    .subscribe(
      data => {
        this.router.navigateByUrl('/');
       //console.log(data);
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
