import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService, ModulesService } from '../shared';
import { DragulaService } from 'ng2-dragula';
import * as $ from 'jquery';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss']
})
export class FormbuilderComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private modulesService: ModulesService,
    private dragulaService: DragulaService) {
    dragulaService.setOptions('fifth-bag', {
      revertOnSpill: true
    });
    
  
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    }); 
  }

  isAuthenticated: boolean;
  jsonArr:Array<Object>;
  moduleType:string;
  ngOnDestroy(){
    this.dragulaService.destroy('fifth-bag');
  }
  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.jsonArr = data.modules.modulesFields;
        this.moduleType=data.modules.type;
         console.log(data);
      })
  }

  popupBody : string ="";
  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
  listSubField: Array<Object> =[];
  validationLabels : Array<string> = ["Alpha (a-zA-Z)","Alphanumeric (a-zA-Z0-9_)","Date (DD/MM/YYYY)","Datetime (DD/MM/YYYY HH:mm)","Email","URL","Number (0-9)"];

  public postFormData(){

   // $(this).children('.form-elements').each(function () {
      var fldObj={};
      fldObj["colPosition"]=0;
      fldObj["sectionId"]=0;

      var $fldt = $('.form-elements');
      var fieldType = $fldt.find('input[name=type]').val();
      var fldId = $fldt.find('input[name=id]').val();
      fldObj["name"]=$fldt.find('input[name=name]').val();
      fldObj["id"] = fldId;
      fldObj["fieldKey"] = $fldt.find('input[name=fieldKey]').val();
      fldObj["type"]= fieldType;

      if($fldt.find('input[name=required]').prop('checked')){
        fldObj["required"] = $fldt.find('input[name=required]').prop('checked')?1:0;
      }
      fldObj["label"] = $fldt.find('input[name=label]').val();
      
      if($fldt.find('input[name=multiple]') && $fldt.find('input[name=multiple]').prop('checked')){
        fldObj["multiple"] = $fldt.find('input[name=multiple]').prop('checked')?1:0;
      }
      if($fldt.find('input[name=toggle]') && $fldt.find('input[name=toggle]').prop('checked')){
        fldObj["toggle"] = $fldt.find('input[name=toggle]').prop('checked')?1:0;
      }
      if($fldt.find('input[name=description]')){
        fldObj["description"] = $fldt.find('input[name=description]').val();
      }
      if($fldt.find('input[name=subtype]')){
        fldObj["subtype"] = $fldt.find('input[name=subtype]').val();
      }
      if($fldt.find('select[name=validation]')){
        var selectValid = $fldt.find('select[name=validation]').val();
        fldObj["validation"] = (selectValid=='None'?'':selectValid);
      }
      if($fldt.find('select[name=subfield]')){
        var selectValid = $fldt.find('select[name=subfield]').val();
        fldObj["subfield"] = (selectValid=='None'?'':selectValid);
      }
      
      if($fldt.find('input[name=placeholder]')){
        fldObj["placeholder"] = $fldt.find('input[name=placeholder]').val();
      }	
      if($fldt.find('input[name=className]')){
        fldObj["className"] = $fldt.find('input[name=className]').val();
      }
      if($fldt.find('input[name=name]')){
        fldObj["name"] = $fldt.find('input[name=name]').val();
      }
      if($fldt.find('input[name=min]')){	
        fldObj["min"] = $fldt.find('input[name=min]').val();
      }
      if($fldt.find('input[name=isSystem]').prop('checked')){
        fldObj["isSystem"] = $fldt.find('input[name=isSystem]').prop('checked')?1:0;
      }
      if($fldt.find('input[name=isLocked]').prop('checked')){
        fldObj["isLocked"] = $fldt.find('input[name=isLocked]').prop('checked')?1:0;
      }
      if($fldt.find('input[name=maxlength]')){
        fldObj["maxlength"] = $fldt.find('input[name=maxlength]').val();
      }else if($fldt.find('input[name=max]')){
        fldObj["max"] = $fldt.find('input[name=max]').val();
      }
      if($fldt.find('input[name=step]')){	
        fldObj["step"] = $fldt.find('input[name=step]').val();
      }	
      if($fldt.find('input[name=rows]')){	
        fldObj["rows"] = $fldt.find('input[name=rows]').val();
      }	

      if($fldt.find('input[name="view"]:checked').length>0){
        var viewval = [];
        $fldt.find('input[name="view"]:checked').each(function(e,v) {
          viewval.push(v['value']);
          console.log('value view : '+v['value']);
        });
        fldObj["view"] = viewval.join(',');
      }
      
      if (fieldType=='select') {
        var allopt=[];
        $fldt.find('.sortable-options').children('li').each(function () {
          var option = {};
          option['selected'] = $('.option-selected', this).is(':checked');
          option['value'] = $('.option-value', this).val();
          option['label'] = $('.option-value', this).val();
          allopt.push(option);
          });
        fldObj["value"]=allopt;
      }else{
        if($fldt.find('input[name=value]')){
          fldObj["value"] = $fldt.find('input[name=value]').val();
       }
      }
      //console.log($(this).attr('id') +' : '+ $(this).attr('name')  + '=' + ( $(this).index() + 1 ) );
      console.log(fldObj);
  //  });	
    this.modulesService.postModuleField("0",fldObj).subscribe(
      data => {
        //console.log(data); 
        $("#closemodal").click();
      },
      err => {
        console.log(err); 
      }
    );
  }
    
 public openPopup(fldid){
    this.modulesService.getModuleField(fldid).subscribe(
      data => { 
      //  console.log(data.modulesFields);
        var htmlval = this.textAttribute(data.moduleField);
        $('.modal-body').empty().append(htmlval);
        $('.modal-title').html('Properties : '+data.moduleField['label']);
        $('#modalTrigger').click();
      },
      err => {
        console.log(err); 
      }
    );
  }
 
  public deleteField(fldid){
    this.modulesService.delModuleField(fldid).subscribe(
      data => { 
        $(".fld_"+fldid).remove();
        console.log(data);
      },
      err => {
        console.log(err); 
      }
    );
  }

  public updateFieldOrders(){
    var modArr=[];
    var seci=0;
    $('.section-div').each(function () {
        var secMap={};
        var secId = $(this).attr('sectionid');
        var coli=0;
        secMap['sectionId']=secId;
        $('.column-div').each(function () {
              coli=coli+1;
              var fldi=0;
              var fieldArr=[];
              $(this).find('div.form-field').each(function () {
                fieldArr[fldi]=$(this).attr("id");
                fldi=fldi+1;
              });
              secMap['colPos']=coli;
              secMap['field']=fieldArr;
        });
        modArr[seci]=secMap;
        seci = seci + 1;
    });
    var posMap = {};
    posMap['pos']=modArr;
    this.modulesService.postModuleData(this.moduleType,posMap).subscribe(
      data => { 
      //  $(".fld_"+fldid).remove();
       // console.log(data);
        location.reload();
        //this.router.navigateByUrl('/module/'+this.moduleType);
         //this.router.navigate([this.returnUrl]);
       //  console.log(data);
      },
      err => {
        console.log(err); 
       // if (err === 'Unauthorized') { this.router.navigateByUrl('/login'); }
      }
    );
    // console.log(posMap);
  }
  
  public addSubField(mf){
    this.listSubField.push(mf);
  }
 
  private textAttribute(field){
    var attributeLabel = '<div class="form-elements">';
    
    attributeLabel += '<div class="form-group row"><input type="hidden" name="id" value="'+field.id+'"><input type="hidden" name="name" value="'+field.name+'"><input type="hidden" name="fieldKey" value="'+field.fieldKey+'"><input type="hidden" name="type" value="'+field.type+'"></div>';

    // Required
    attributeLabel += '<div class="form-group row"><div  class="col-sm-2" ><label for="required-text-input">Required</label></div><div class="col-sm-10"><div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox" name="required" value="1" '+(field.required==1?'checked':'')+' id="required-text-input">&nbsp;</label></div></div></div>';
    // label
    attributeLabel += '<div class="form-group row"><label for="lable-text-input" class="col-2 col-form-label">Label</label><div class="col-10"><input class="form-control" type="text" name="label" value="'+field.label+'" id="required-text-input"></div></div>';

    attributeLabel += '<div class="form-group row"><label for="helptext-text-input" class="col-2 col-form-label">Help Text</label><div class="col-10"><input class="form-control" type="text" name="description" value="'+(field.description?field.description:'')+'" id="helptext-text-input"></div></div>';

    switch(field.type) {
      case "select":
      // sub Fields
           attributeLabel += '<div class="form-group row"><label class="col-2 col-form-label" for="inlineFormCustomSelect">Sub Field Of</label><div class="col-10"><select class="custom-select form-control" name="subfield" id="inlineFormCustomSelect"><option value="None">Choose...</option>';
           for(var i=0;i<this.listSubField.length;i++) {
             var mfd=this.listSubField[i];
             var val=mfd['name'];
             var lbl=mfd['label'];
             attributeLabel += '<option value="'+val+'" id="'+mfd['id']+'">'+lbl+'</option>';
          }
          attributeLabel += '</select></div></div>';
      // multi select enable
           attributeLabel += '<div class="form-group row"><div  class="col-sm-2" ><label for="multiple-text-input">Allow Multiple</label></div><div class="col-sm-10"><div class="form-check"><label class="form-check-label"><input class="form-check-input '+field.name+'_multiple" type="checkbox" name="multiple" value="1" '+(field.multiple==1?"checked":"")+' id="multiple-text-input" onclick="swapChk2Radio(\''+field.name+'\');">&nbsp;</label></div></div></div>';
      // options
          attributeLabel += '<div class="form-group row"><label class="col-2 col-form-label" for="OptionSelect">Option</label><div class="col-10"><ul class="list-group optul sortable-options" style="max-height:200px;overflow-y:auto;overflow-x:hidden;">';
          
          var fval =  field.value;
          fval = fval.split("}, {").join("},{");
          fval = fval.split("{").join("{\"");
          fval = fval.split("}").join("\"}");
          fval = fval.split("=").join("\":\"");
          fval = fval.split(", ").join("\",\"");
          fval = fval.split("\"false\"").join("false");
          fval = fval.split("\"true\"").join("true");

          var fieldval = JSON.parse(fval); 
          for(var i=0;i<fieldval.length;i++) {
              attributeLabel += '<li class="list-group-item"><div class="row"><div class="col-1 '+field.name+'_swap"><input type="radio" name="'+field.name+'_check" class="'+field.name+'_check option-selected" style="margin-top: 12px;" value="1" '+(fieldval[i].selected?"checked":"")+'></div><div class="col-9"><input type="text" name="'+field.name+'_text" class="form-control option-value" value="'+fieldval[i].label+'"></div><div class="col-2"><span onclick="removeOption(this);" style="line-height: 37px;"><i class="fa fa-trash-o" aria-hidden="true"></i></span></div></div></li>';
          }
          attributeLabel += '</ul><div class="btn btn-sm btn-info float-right m-2" onclick="addOption(\''+field.name+'\');"><i class="fa fa-plus" aria-hidden="true"></i> Option</div></div></div>';
      break;
      default:
         
      // validationLabels
      attributeLabel += '<div class="form-group row"><label class="col-2 col-form-label" for="inlineValidationSelect">Validation</label><div class="col-10"><select class="custom-select form-control" id="inlineValidationSelect" name="validation"><option value="None">Choose...</option>';
      for(var i=0;i<this.validationLabels.length;i++) {
        attributeLabel += '<option value="'+this.validationLabels[i]+'">'+this.validationLabels[i]+'</option>';
      }
      
      attributeLabel += '</select></div></div>';

      // Placeholder
         attributeLabel += '<div class="form-group row"><label for="placeholder-text-input" class="col-2 col-form-label">Placeholder</label><div class="col-10"><input class="form-control" type="text" value="'+(field.placeholder?field.placeholder:'')+'" name="placeholder" id="placeholder-text-input"></div></div>';
         //value
         attributeLabel += '<div class="form-group row"><label for="value-text-input" class="col-2 col-form-label">Value</label><div class="col-10"><input class="form-control" type="text" value="'+(field.value?field.value:'')+'" name="value" id="value-text-input"></div></div>';


        //max length
        attributeLabel += '<div class="form-group row"><label for="max-len-text-input" class="col-2 col-form-label">Max Length</label><div class="col-10"><input class="form-control" type="text" value="'+(field.maxlength?field.maxlength:'')+'" name="maxlength" id="max-len-text-input"></div></div>';
    
      break;
    }

    
   // View
    attributeLabel += '<div class="form-group row"><div  class="col-sm-2" ><label for="views-text-input">View</label></div><div class="col-sm-10"><div class="form-check"><label class="form-check-label" for="views-check-create"><input class="form-check-input" name="view" type="checkbox" '+(field.view && field.view.indexOf("create")!==-1?'checked':'')+' value="create" id="views-check-create">Create</label></div><div class="form-check"><label class="form-check-label" for="views-check-update"><input class="form-check-input" name="view" '+(field.view && field.view.indexOf("update")!==-1?'checked':'')+' value="update" type="checkbox" id="views-check-update">Update</label></div><div class="form-check"><label class="form-check-label" for="views-check-quick"><input class="form-check-input" name="view" type="checkbox" id="views-check-quick" '+(field.view && field.view.indexOf("quick")!==-1?'checked':'')+' value="quick">Quick</label></div><div class="form-check"><label class="form-check-label" for="views-check-view"><input class="form-check-input" name="view" type="checkbox" id="views-check-view" '+(field.view && field.view.indexOf("view")!==-1?'checked':'')+' value="view">View</label></div></div></div>';
   
  //Edit Locked
    attributeLabel += '<div class="form-group row"><div class="col-sm-2" ><label for="editLocked-text-input">Edit Locked</label></div><div class="col-sm-10"><div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox" id="editLocked-text-input" name="isLocked" '+(field.isLocked && field.isLocked==1?'checked':'')+'>&nbsp;</label></div></div></div>';

    attributeLabel += '</div>';
    return attributeLabel;
  }

 
  
  private onDrag(args) {
    let [e, el] = args;
   // this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    var mfLabel = $(e).attr('mflabel');  
   if(mfLabel) {
        $(e).removeAttr('mflabel');  
        var htmldat='<div class="box m-0"><div class="box-header pdot5 primary"><h3> '+mfLabel+' </h3><small>'+mfLabel+'</small><div class="box-tool"><ul class="nav"><li class="nav-item inline"><span class="nav-link" (click)="openPopup()"><i class="fa fa-cog" aria-hidden="true"></i></span></li><li class="nav-item inline"><a class="nav-link"><i class="fa fa-trash-o" aria-hidden="true"></i></a></li><li class="nav-item inline dropdown"><a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"> <i class="fa fa-ellipsis-v" aria-hidden="true"></i></a><div class="dropdown-menu dropdown-menu-right"><span class="dropdown-item" (click)="openPopup()">Edit</span><span class="dropdown-item">Required</span><div class="dropdown-divider"></div><span class="dropdown-item">Delete</span></div></li></ul></div></div></div>';
        $(e).addClass('p-0 primary').html(htmldat); 
   }
  }


}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {}
}




