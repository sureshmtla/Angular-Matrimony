import { ModuleWithProviders,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ModulesResolver } from './../modules/modules-resolver.service';
import { FormbuilderResolver } from './formbuilder-resolver.service';
import { ModulesComponent } from './../modules/modules.component';
import { FormbuilderComponent } from './formbuilder.component';
import { EcreateDirective } from './ecreate.directive';
import { DragulaModule } from 'ng2-dragula';

const moduleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'module/:type',
    component: FormbuilderComponent,
    resolve: {
      modules: FormbuilderResolver
    },
    children: [ ]
  },
  {
    path: 'modules',
    component: ModulesComponent,
    resolve: {
      modules: ModulesResolver
    },
    children: [ ]
  }
]);

@NgModule({
  imports: [
    moduleRouting,
    DragulaModule,
    CommonModule
  ],
  declarations: [
    ModulesComponent,
    FormbuilderComponent,
    EcreateDirective
  ],
  providers: [
    ModulesResolver,
    FormbuilderResolver
  ]
})
export class FormbuilderModule { }
