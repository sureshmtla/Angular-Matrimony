import { Component, OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver,Compiler,ComponentFactory  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ScrollEvent } from 'ngx-scroll-event';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Overlay,overlayConfigFactory } from 'ngx-modialog';
import {  BootstrapModalModule, Modal, bootstrap4Mode,BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { Errors, UserService } from '../shared';

@Component({ 
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  public show: boolean = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';



  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  @ViewChild('matchesContainer', {read: ViewContainerRef}) matchesContainerRef;
  private componentFactory: ComponentFactory<any>;
  public loadingdiv:boolean = false;
  public selectedIndex:number = 0;  
  onTop:boolean = true;
  onBottom:boolean = false;
  afReg:boolean = false;

  title: String = 'Sign in';
  errors: Errors = new Errors();
  sginInErrors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  isUpSubmitting = false;
  signupForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private ufb: FormBuilder,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', [Validators.required,Validators.email]],
      'password': ['', Validators.required]
    });

    this.signupForm = this.ufb.group({
      'displayName': ['', Validators.required],
      'username': ['', [Validators.required,Validators.email]],
      'mobile': ['', Validators.required]
    });
  }

  ngOnInit() {
    /*this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('displayName', new FormControl());
      }
    }); */
  }

  submitForm() {
    this.isSubmitting = true;
    this.sginInErrors = new Errors();

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth('login', credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        console.log(err);
        this.sginInErrors = err;
        this.isSubmitting = false;
      }
    );
  }

  submitUpForm() {
    this.isUpSubmitting = true;
    this.errors = new Errors();

    const credentials = this.signupForm.value;
    this.userService
    .signup(credentials)
    .subscribe(
      data => {
        //this.router.navigateByUrl('/');
        this.afReg=true;
       //console.log(data);
      },
      err => {
        this.errors = err;
        this.isUpSubmitting = false;
      }
    );
  }


  onIndexChange(index: number) {
    console.log('Swiper index: ' + index);
  }

 
  aboveScrollTopPos() {
     $(".sps").addClass("sps--abv").removeClass('sps--blw');
  }
  belowScrollTopPos() {
     $(".sps").addClass("sps--blw").removeClass('sps--abv');
  }

  aboveScrollBottomPos() {
    $(".btm-ss").hide();
  }
  belowScrollBottomPos() {
    $(".btm-ss").show();
  }

  public handleScroll(event: ScrollEvent) {
    // console.log('scroll occurred', event.originalEvent);
     if (event.isReachingBottom) {
       if(!this.onBottom){
         this.onBottom = true;
         this.belowScrollBottomPos();
         console.log(`the user is reaching the bottom`);
       } 
     }else{
       if(this.onBottom){
         this.onBottom =false;
         this.aboveScrollBottomPos();
       } 
     }
     if (event.isReachingTop) {
       if(!this.onTop){
         this.onTop = true;
         this.aboveScrollTopPos();
         console.log(`the user is reaching the Top`);
       } 
     }else{
       if(this.onTop){
         this.onTop =false;
         this.belowScrollTopPos();
       } 
     }
     if (event.isWindowEvent) {
      // console.log(`This event is fired on Window not on an element.`);
     }
  
   }
 
}
