import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginModule } from './login/login.module';


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    LoginModule
  ],
  exports: [
    LoginModule
  ]
})
export class AccountModule { }
