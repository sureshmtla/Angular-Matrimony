import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

import { UsersResolverService } from './users-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { SharedModule } from '../shared';
import { UserComponent } from './user.component';
import { UpdatepremiumComponent } from './updatepremium.component';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { ViewpremiumComponent } from './viewpremium.component';

const usersRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'users/:status',
    component: UsersComponent,
    resolve: {
      users : UsersResolverService
    },
    children: [
      
    ]
  },
  {
    path: 'user/:uid',
    component: UserComponent,
    resolve: {
      user : UserResolverService
    },
    children: [
      
    ]
  }
]);


@NgModule({
  imports: [
    usersRouting,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [UsersComponent, UserComponent, UpdatepremiumComponent, ViewpremiumComponent],
  providers: [
    UsersResolverService,
    UserResolverService
  ],
  entryComponents:[UpdatepremiumComponent,ViewpremiumComponent]
})
export class UsersModule { }
