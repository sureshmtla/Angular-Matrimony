import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { EditformsComponent } from './editforms.component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [EditformsComponent],
  entryComponents:[EditformsComponent]
})
export class EditformsModule { }
