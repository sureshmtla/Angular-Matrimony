import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { EditloadComponent } from './editload.component';
import { EditcreateDirective } from './editcreate.directive';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  declarations: [EditloadComponent,EditcreateDirective],
  entryComponents:[EditloadComponent]
})
export class EditloadModule { }
