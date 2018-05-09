import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumpacksComponent } from './premiumpacks.component';
import { PackComponent } from './pack.component';

import { PremiumpacksResolver } from './premiumpacks-resolver.service';
import { SharedModule } from '../shared';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

const premiumpackRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'premiumpacks',
    component: PremiumpacksComponent,
    resolve: {
      premiumpack: PremiumpacksResolver
    }
  }
]);

@NgModule({
  imports: [
    premiumpackRouting,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    PremiumpacksResolver
  ],
  declarations: [
    PremiumpacksComponent,
    PackComponent
  ],
  entryComponents:[PackComponent]
})
export class PremiumpacksModule { }
