import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
