import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ImageCropperModule} from "ng2-img-cropper/index";

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { FileUploadComponent } from './file-upload.component'

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ImageCropperModule
  ],
  declarations: [
    FileUploadComponent],
  entryComponents:[FileUploadComponent]
})
export class FileUploadModule { }
 