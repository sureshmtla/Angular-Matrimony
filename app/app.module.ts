import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { EditformsModule } from './editforms/editforms.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { PageloadModule } from './pageload/pageload.module';
import { EditloadModule } from './editload/editload.module';
import { FormbuilderModule } from './formbuilder/formbuilder.module';
import { ViewothersprofileModule } from './viewothersprofile/viewothersprofile.module';
import { PremiumpacksModule } from './premiumpacks/premiumpacks.module';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';

import {
  ApiService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  JwtService,
  ProfilesService,
  SharedModule,
  UserService,
  HomelistService,
  LeftbarComponent,
  RightbarComponent,
  UploadFileService,
  ModulesService,
  PremiumpacksService,
  Searchdata
} from './shared';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { InviteuserComponent } from './inviteuser/inviteuser.component';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LeftbarComponent,
    RightbarComponent,
    ResetpassComponent,
    InviteuserComponent,
    UpdatedetailsComponent
  ],
  imports: [
    AngularMultiSelectModule,
    BrowserModule,
    AuthModule,
    HomeModule,
    ProfileModule,
    rootRouting,
    SharedModule,
    SettingsModule,
    ViewothersprofileModule,
    FileUploadModule,
    EditformsModule,
    PageloadModule,
    EditloadModule,
    FormbuilderModule,
    PremiumpacksModule,
    UsersModule,
    SearchModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    UserService,
    HomelistService,
    UploadFileService,
    ModulesService,
    PremiumpacksService,
    Searchdata
  ],
  bootstrap: [AppComponent],
  entryComponents:[ResetpassComponent,InviteuserComponent,UpdatedetailsComponent]

})
export class AppModule { }
