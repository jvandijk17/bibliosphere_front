import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

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
    MatGridListModule    
  ]
})
export class AccountModule { }
