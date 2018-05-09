import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageloadComponent } from './pageload.component';
import { PageprofilesComponent } from './pageprofiles.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule 
  ],
  declarations: [PageloadComponent, PageprofilesComponent],
  entryComponents:[PageloadComponent, PageprofilesComponent]
})
export class PageloadModule { }
