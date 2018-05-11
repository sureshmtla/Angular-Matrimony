import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      
    ]
  }
]);

@NgModule({
  imports: [
    profileRouting,
    SharedModule,
    AngularMultiSelectModule
  ],
  declarations: [
    ProfileComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfileModule {}
