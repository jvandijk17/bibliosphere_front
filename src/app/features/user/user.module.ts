import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from 'src/app/core/application-services/user.service';

import { LayoutModule } from '@angular/cdk/layout';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToggleUserStatusAction } from './strategies/toggle-user-status.action';
import { ViewUserDetailsAction } from './strategies/view-user-details.action';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    UserRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    UserService,
    ToggleUserStatusAction,
    ViewUserDetailsAction
  ]
})
export class UserModule { }
