import { Component, OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver,Compiler,ComponentFactory } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User, UserService,ProfilesService,PremiumpacksService } from '../shared';
import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { ViewpremiumComponent } from './viewpremium.component';

export class CustomModalContext extends BSModalContext {
  public title: string;
  public uid : string;
  public premiumpacks:any;
}

@Component({
  selector: 'app-updatepremium',
  templateUrl: './updatepremium.component.html',
  styleUrls: ['./updatepremium.component.scss']
})
export class UpdatepremiumComponent implements OnInit,CloseGuard, ModalComponent<CustomModalContext> {
  @ViewChild('premiumContainer', {read: ViewContainerRef}) premiumContainerRef;
   
  context: CustomModalContext;
  private componentFactory: ComponentFactory<any>;
  selectedPremiumid:string;
  
  constructor(private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private profilesService: ProfilesService,
    private premiumpacksService: PremiumpacksService,
    public dialog: DialogRef<CustomModalContext>,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef, compiler: Compiler) { 
      this.context = dialog.context;
      dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true;
  }

  public closeModal() {
    this.dialog.close();
  }

  ngOnInit() {
   // console.log(this.context.premiumpacks);
  }
  
  
  
  onViewPremiumDetails(event){
  	this.selectedPremiumid = event.target.value;
  	this.premiumpacksService.getPremiumPack(this.selectedPremiumid).subscribe(
      	(data) => {
  	 this.componentFactory = this._componentFactoryResolver.resolveComponentFactory(ViewpremiumComponent);
	 this.premiumContainerRef.clear();
	 let instance  = this.premiumContainerRef.createComponent(this.componentFactory, 0).instance;
	 instance.premiumpack = data.premiumpack;
      });
  }
  
  
  onUpdatePremiumUser() {
  	var premiumdetails={};
  	premiumdetails['uid']= this.context.uid;
  	premiumdetails['premiumid']=this.selectedPremiumid;
  	premiumdetails['invite']=0;
  	this.profilesService.postUserPremiumUpdate(premiumdetails).subscribe(
        (data) => {
            //console.log(data);
            this.dialog.close();
            this.router.navigate(['/user',this.context.uid],{queryParams: {'r':this.selectedPremiumid}});
            //location.reload();
    	    }
    	);
  }

}
