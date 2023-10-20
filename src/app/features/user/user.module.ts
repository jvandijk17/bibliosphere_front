import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from 'src/app/core/application-services/user.service';

import { LayoutModule } from '@angular/cdk/layout';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserDetailsModalComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    UserRoutingModule,    
    LayoutModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
