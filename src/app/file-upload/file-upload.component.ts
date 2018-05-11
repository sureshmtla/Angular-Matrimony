import { Component, OnInit,ViewChild } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { User, UserService, Profile,UploadFileService } from '../shared';

import { DialogRef, ModalComponent, CloseGuard }  from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public type: string;
  public typeId: string;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit,CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
 //public wrongAnswer: boolean;
  data:any;
  cropperSettings: CropperSettings;
  form: FormGroup;

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;
    
  constructor( private uploadFileService: UploadFileService,
    private fb: FormBuilder,public dialog: DialogRef<CustomModalContext>) { 
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.width = 200;
      this.cropperSettings.height = 200;

      this.cropperSettings.minWidth = 10;
      this.cropperSettings.minHeight = 10;

      this.cropperSettings.croppedWidth = 200;
      this.cropperSettings.croppedHeight = 200;

      this.cropperSettings.rounded = false;
      this.cropperSettings.keepAspect = false;

      this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
      this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

      this.data = {};
      this.createForm();

      this.context = dialog.context;
     // this.wrongAnswer = true;
      dialog.setCloseGuard(this);
    }

    beforeDismiss(): boolean {
      return true;
    }
  
    //beforeClose(): boolean {
    //  return this.wrongAnswer;
   // }
  
    createForm() {
      this.form = this.fb.group({
        type:'',
        typeId:'',
        base64img: null,
        fileName:'',
        fileType:'png'
      });
    }
  
    fileChangeListener($event) {
      var image:any = new Image();
      var file:File = $event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
      };
      myReader.readAsDataURL(file);
  }
  
  public closeModal() {
    this.dialog.close();
  }

  public uploadFile() {
    this.form.get('type').setValue(this.context.type);
    this.form.get('typeId').setValue(this.context.typeId);
    this.form.get('base64img').setValue(this.data.image.split(',')[1]);
    
    this.uploadFileService.pushFileToStorage(this.form.value).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        //this.progress.percentage = Math.round(100 * event.loaded / event.total);
        console.log('File uploaded percentage : '+Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
     // console.log(this.data);
     this.dialog.close(this.data);
  }

  ngOnInit() {
  }

}


/*

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

export class CustomModal implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }
  
}


*/