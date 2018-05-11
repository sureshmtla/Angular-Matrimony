import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { User, ProfilesService,UserService } from '../shared';
import { FlashMessagesService } from 'angular2-flash-messages';


import { environment } from '../../environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  lMathes:any;
  apiUrl = environment.api_url;
  currentUser: User; 
  public reqProcessing:string='id';
 public searchData:any;
 
 isSubmitting = false;
  searchForm: FormGroup;
  isSearch:boolean = false;

  public value: string[];
  public current: string;
  dropdownList:Array<any> = [];
  selectedItems:Array<any> = [];
  dropdownSettings:any = {};

  heightList:Array<any> = [];
  selFromHeightList:Array<any> = [{"id":1,"itemName":"5.0"}];
  selToHeightList:Array<any> = [{"id":1,"itemName":"6.5"}];

  ageList:Array<any> = [];
  selFromAgeList:Array<any> = [{"id":1,"itemName":"25"}];
  selToAgeList:Array<any> = [{"id":1,"itemName":"35"}];

  starList:Array<any> = [{"id":1,"itemName":"Any"},{"id":2,"itemName":"Kettai"},{"id":3,"itemName":"Avittam"},{"id":4,"itemName":"Bharani"},{"id":5,"itemName":"Pooradam"},{"id":6,"itemName":"Karthikai"},{"id":7,"itemName":"Moolam"},{"id":8,"itemName":"Hastham"},{"id":9,"itemName":"Uthiram"},{"id":10,"itemName":"Ashwini"},{"id":11,"itemName":"Swathi"},{"id":12,"itemName":"Thiruvonam"},{"id":13,"itemName":"Chithirai"},{"id":14,"itemName":"Rohini"},{"id":15,"itemName":"Anusham"},{"id":16,"itemName":"Makam"},{"id":17,"itemName":"Uthradam"},{"id":18,"itemName":"Thirivathirai"},{"id":19,"itemName":"Purathathi"},{"id":20,"itemName":"Punarpoosam"},{"id":21,"itemName":"Poosam"},{"id":22,"itemName":"Pooram"},{"id":23,"itemName":"Uthrattathi"},{"id":24,"itemName":"Visakam"},{"id":25,"itemName":"Sathayam"},{"id":26,"itemName":"Revathi"},{"id":27,"itemName":"Mirigasirisham"},{"id":28,"itemName":"Ayilyam"}];
  selStarList:Array<any> =[{"id":1,"itemName":"Any"}];
  doshamList:Array<any> = [{"id":1,"itemName":"Any"},{"id":2,"itemName":"No"},{"id":3,"itemName":"Chevvai Dosham"},{"id":4,"itemName":"Naga Dosham"},{"id":5,"itemName":"Kala Sarpa Dosham"},{"id":6,"itemName":"Rahu Dosham"},{"id":7,"itemName":"Kethu Dosham"},{"id":8,"itemName":"Kalathra Dosham"}];
  selDoshamList:Array<any> = [{"id":1,"itemName":"Any"}];
  motherTongueList:Array<any> = [{"id":1,"itemName":"Any"},{"id":2,"itemName":"Tamil"},{"id":3,"itemName":"Telugu"},{"id":4,"itemName":"Malayalam"},{"id":5,"itemName":"Kannada"},{"id":6,"itemName":"Hindi"},];
  selMotherTongueList:Array<any> = [{"id":1,"itemName":"Any"}];
  maritalStatusList:Array<any> = [{"id":1,"itemName":"Any"},{"id":2,"itemName":"Never Married"},{"id":3,"itemName":"Widowed"},{"id":4,"itemName":"Awaiting Divorce"},{"id":5,"itemName":"Divorced"},];
  selMaritalStatusList:Array<any> = [{"id":1,"itemName":"Any"}];

  starDropdownSettings:any = {};  
  doshamDropdownSettings:any = {};  
  motherTongueDropdownSettings:any = {};  
  maritalStatusDropdownSettings:any = {};  
  fromAgeDropdownSettings:any = {};  
  toAgeDropdownSettings:any = {};  
  fromHeightDropdownSettings:any = {};  
  toHeightDropdownSettings:any = {}; 

  private searchid:number=0;

  constructor(private route: ActivatedRoute,
    private profilesService: ProfilesService,private fb: FormBuilder,
    private flashMessagesService: FlashMessagesService,private userService: UserService) { 
   
    this.searchForm = this.fb.group({
      'fromAge': [[], Validators.required],
      'toAge': [[], Validators.required],
      'fromHeight': [[], Validators.required],
      'toHeight': [[], Validators.required],
      'maritalStatus': [[], Validators.required],
      'motherTongue': [[], Validators.required],
      'dosham': [[], Validators.required],
      'star': [[], Validators.required]
    });

    for(let i=18,j=0;i<=65;i++,j++){
      this.ageList[j] = {"id":i,"itemName":i};
    }
    for(let i=3.5,j=0;i<8;i+=0.5,j++){
      this.heightList[j] = {"id":i,"itemName":i};
    }

  }

  ngOnInit() {
    console.log('@@@@@@@@@@@@@@@@@@@2 from head'); 
    console.log(JSON.stringify(this.searchData));

    this.starDropdownSettings = {singleSelection: false,text:"Select Star"};  
    this.doshamDropdownSettings = {singleSelection: false,text:"Select Dosham"};  
    this.motherTongueDropdownSettings = {  singleSelection: false,text:"Select Mother Tongue"};  
    this.maritalStatusDropdownSettings = {  singleSelection: false,text:"Select Marital Status"};  

    this.fromAgeDropdownSettings = {  singleSelection: true,text:"Select Mother Tongue"};  
    this.toAgeDropdownSettings = {  singleSelection: true,text:"Select Marital Status"};  
    this.fromHeightDropdownSettings = {  singleSelection: true,text:"Select Mother Tongue"};  
    this.toHeightDropdownSettings = {  singleSelection: true,text:"Select Marital Status"};  

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      });

  }

  
  loadsearchpagewithdata() {
    this.isSubmitting = true;
    const searchValues = this.searchForm.value;
    //console.log(searchValues);
    this.isSearch=true;

    this.profilesService.searchProfiles(searchValues).subscribe(
      (data) => {
      //  this.searchid++;
        this.searchData = data;
        
    if(this.searchData!=null) this.lMathes =  this.searchData.matches
    this.showSearchDiv();
      //  var param = "r"+this.searchid;
       // this.viewContainerRef.clear();
      // this.router.navigate(['/search',this.searchid],{queryParams : {param:this.searchid}});
        //this.searchComponent.sendData(data,this.currentUser);
     //   console.log(data);
      //  console.log('############################ after searched');
      });
 }



  public sendData(data,cuser){
    console.log('@@@@@@@@@@@@@@@@@@@2 from head');
    console.log(data);
  }

  updateReq(uid,type,c) {

    this.profilesService.postReqProfileData(uid,type,'req')
    .subscribe(data => {
      this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
      //console.log(data);
      if(type=='photo') {
        c.requestPhoto=1;
      }else if(type=='horoscope'){
       c.requestHoroscope=1;
      }else if(type=='mobile'){
      c.requestMobile=1;
      }else if(type=='message'){
        c.requestMessage=1;
      }
    });
    }
  
    updateProfileStatus(uid,type,c){
      this.reqProcessing=uid;
      this.profilesService.postReqProfileData(uid,type,'status')
      .subscribe(data => {
        this.flashMessagesService.show('Your request send successfully!', { cssClass: 'alert-success', timeout: 3000 });
        this.reqProcessing='id';
        c.ostatus = type;
        //console.log(data);
      });
    }

    showSearchDiv(){
      $('#searchdiv').toggle();
    }
    
}
