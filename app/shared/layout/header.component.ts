import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService,ProfilesService,Searchdata } from '../services';
import { RouterModule,Router } from '@angular/router';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  
   
  constructor(private userService: UserService,private profilesService: ProfilesService,
    private router: Router) {

   //  this.componentFactory = this._componentFactoryResolver.resolveComponentFactory(SearchComponent);
    
  }

  apiUrl = environment.api_url;
  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      });
  }

  public hLeft() {
    $('.app-wrapper').toggleClass('left-active');
  }

  public hRight() {
    $('.app-wrapper').toggleClass('right-active');
  }

/*
  objectifyForm(formArray) {//serialize data function
    
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

*/

loadsearchprofile(){
  var searchpro = $("#dropdownMenu2").val();
  if(searchpro!='')
    this.router.navigate(['/view', searchpro]);
}
  
  loadsearchpage() {
       var searchid=1;
       this.router.navigate(['/search', searchid]);
  }

  logout(){
    this.userService.purgeAuth();
  }

 /*
  this.dropdownList = [
        {"id":1,"itemName":"India"},
        {"id":2,"itemName":"Singapore"},
        {"id":3,"itemName":"Australia"},
        {"id":4,"itemName":"Canada"},
        {"id":5,"itemName":"South Korea"},
        {"id":6,"itemName":"Germany"},
        {"id":7,"itemName":"France"},
        {"id":8,"itemName":"Russia"},
        {"id":9,"itemName":"Italy"},
        {"id":10,"itemName":"Sweden"}
      ];
this.selectedItems = [
          {"id":2,"itemName":"Singapore"},
          {"id":3,"itemName":"Australia"},
          {"id":4,"itemName":"Canada"},
          {"id":5,"itemName":"South Korea"}
      ];
this.dropdownSettings = { 
            singleSelection: false, 
            text:"Select Countries",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            classes:"myclass custom-class"
          }; 
 onItemSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      console.log(items);
  }
  onDeSelectAll(items: any){
      console.log(items);
  }
*/

}
