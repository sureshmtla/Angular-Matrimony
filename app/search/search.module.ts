import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

const routes: Routes = [
  { path: 'search/:id', component: SearchComponent }
]


@NgModule({
  imports: [ 
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
