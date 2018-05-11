import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewothersprofileComponent } from './viewothersprofile.component';
import { ViewothersprofileService } from './viewothersprofile.service';
import { SharedModule } from '../shared';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


const viewothersprofileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'view/:uid',
    component: ViewothersprofileComponent,
    resolve: {
      profile: ViewothersprofileService
    },
    children: [
      
    ]
  }
]);

@NgModule({
  imports: [
    viewothersprofileRouting,
    SharedModule,
    SwiperModule
  ],
  declarations: [
    ViewothersprofileComponent
  ],
  providers: [
      ViewothersprofileService,
      {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
      }
  ]
})
export class ViewothersprofileModule { }
