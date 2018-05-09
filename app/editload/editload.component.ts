import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-editload',
  templateUrl: './editload.component.html',
  styleUrls: ['./editload.component.scss']
})
export class EditloadComponent implements OnInit {
  public moduleFields:any;
  public moduleData:any;
  public type:string;
 
  selMapList:any ={};
  selAllMapList:any ={};
  selAllMapString:any ={};
  selMapString:String ="";

  selList:Array<any> =[];
  selAllList:Array<any>=[];
  selDropdownSettings:any = {singleSelection: false,text:'Select'};  

  
  public onSave(){

  }
  constructor(public cdRef:ChangeDetectorRef) { }

  ngOnInit() {

    
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public emptyList(name) {
    this.selList=[];
    this.selAllList=[];
    this.selMapList[name]=this.selList;
    this.selAllMapList[name]=this.selAllList;
    this.selAllMapString[name]="";
    this.selMapString="";
   // console.log(this.selAllList);
  }

 public addSelectField(name,val,i,b){
  if(b){
     this.selList = this.selMapList[name];
     if(this.selList==null) this.selList=[];
     this.selList.push({"id":val.value,"itemName":val.label});
     this.selMapList[name]=this.selList;
     this.onChangeSelect(name);
  }
  this.selAllList = this.selAllMapList[name];
  if(this.selAllList==null) this.selAllList=[];
  this.selAllList.push({"id":val.value,"itemName":val.label});
  this.selAllMapList[name]=this.selAllList;

// this.selDropdownSettings = {singleSelection: false,text:"Select"};  
// console.log(this.selAllList);

}

onChangeSelect(name){
  var selectedIt = this.selMapList[name];
  var selStr="";
  for(var i=0;i<selectedIt.length;i++){
    selStr += selectedIt[i].itemName+",";
  }
  this.selAllMapString[name]=selStr;
}

onItemSelect(name,item:any){
  this.onChangeSelect(name);
}
OnItemDeSelect(name,item:any){
  this.onChangeSelect(name);
}
onSelectAll(name,items: any){
  this.onChangeSelect(name);
}
onDeSelectAll(name,items: any){
  this.onChangeSelect(name);
}

}
