import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScrollEventModule } from 'ngx-scroll-event';

import { SignupComponent } from './../signup/signup.component';
import { ForgetpassComponent } from './../forgetpass/forgetpass.component';
import { SetpassComponent } from './../setpass/setpass.component';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';

import { SetpassResolver } from './setpass-resolver.service';
import { ResetpassResolver } from './resetpass-resolver.service';
import { SharedModule } from '../shared';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forget',
    component: ForgetpassComponent
  },
  {
    path: 'validate/:encrypt',
    component: SetpassComponent,
    resolve: {
      profile: SetpassResolver
    }
  },
  {
    path: 'resetpassword/:encrypt',
    component: SetpassComponent,
    resolve: {
      profile: SetpassResolver
    }
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
    ScrollEventModule,
    SwiperModule
  ],
  declarations: [
    AuthComponent,
    SignupComponent,
    ForgetpassComponent,
    SetpassComponent
  ],
  providers: [
    NoAuthGuard,
    SetpassResolver,
    ResetpassResolver
  ]
})
export class AuthModule {}
